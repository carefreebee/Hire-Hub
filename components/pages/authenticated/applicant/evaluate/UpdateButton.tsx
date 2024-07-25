import { getUsersWithoutUserRoles } from "~/Controller/UsersController";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { AssessorInfo } from "../Card/StatusDisplayComponents";
import SubmitEvaluateButton from "../initial-interview/SubmitEvaluateButton";

export default async function UpdateButton({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();
	const { applicant, stages } = await getApplicantData(applicantId);
	const getFinalAssessor = await getUsersWithoutUserRoles();

	const currentInProgress = stages.find((stage) => stage.status === "in-progress");
	const getAssessedBy = currentInProgress?.assessed_by?.[0] ?? "";
	const finalAssessor = getFinalAssessor?.find((user) => user.id === getAssessedBy);
	return (
		<>
			{finalAssessor ? (
				<AssessorInfo
					finalAssessorName={finalAssessor?.name as string}
					finalAssessorRole={finalAssessor?.role as string}
				/>
			) : (
				<p className="text-sm">Wating for Recruitment Officer to set the assessor</p>
			)}

			{user?.role === "recruitment_officer" &&
				applicant?.stages?.initial_interview?.status === "in-progress" && (
					<SubmitEvaluateButton id={applicantId.toString()} />
				)}

			{/* ROLES THAT ARE ASSIGNED TO THE DEPARTMENT OR OFFICES */}
			{user?.id === finalAssessor?.id &&
				currentInProgress?.assessed_by?.length ===
					currentInProgress?.rating_forms_id?.length && (
					<SubmitEvaluateButton id={applicantId.toString()} />
				)}

			{user?.role === "univ_president" && user?.id === finalAssessor?.id && (
				<SubmitEvaluateButton id={applicantId.toString()} />
			)}
		</>
	);
}
