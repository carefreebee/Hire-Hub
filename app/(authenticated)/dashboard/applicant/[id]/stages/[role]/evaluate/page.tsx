import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import Assessor from "~/components/pages/authenticated/applicant/Assessor";
import EvaluateDisplay from "~/components/pages/authenticated/applicant/evaluate/EvaluateDisplay";
import SubmitEvaluateButton from "~/components/pages/authenticated/applicant/initial-interview/SubmitEvaluateButton";
import { getAllRatingFormsFilesById } from "~/controller/RatingFormsController";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { getUserRole } from "~/lib/fetch";
import { RatingFormWithUserData } from "~/types/types";
import { mergeRatingFormData } from "~/util/check-status-in-progress";

export default async function EvaluatePage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const getFinalAssessor = await getUserRole();
	// GETTING THE APPLICANT BY ID
	const { applicant, stages } = await getApplicantData(Number(params.id));
	// FINDING THE IN PROGRESS STATUS BASED ON THE STAGES
	const currentInProgress = stages.find((stage) => stage.status === "in-progress");
	// GET THE FIRST ASSESSOR
	const getAssessedBy = currentInProgress?.assessed_by?.[0] ?? "";
	// FINDING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = getFinalAssessor?.find((user) => user.id === getAssessedBy);
	// GETTING THE RATING FORM
	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	if (!ratingForm) {
		return <CardContainer>No Rating Form yet.</CardContainer>;
	}
	// MERGING THE RATING FORM DATA
	const mergedData = await mergeRatingFormData(ratingForm);

	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 flex h-[550px] w-full flex-col justify-between gap-5 p-5">
				<EvaluateDisplay mergedData={mergedData as RatingFormWithUserData[]} />
				<CardFooter className="pt-5">
					{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
					{finalAssessor ? (
						<Assessor
							finalAssessorName={finalAssessor?.name as string}
							finalAssessorRole={finalAssessor?.role as string}
						/>
					) : (
						<p className="text-sm">
							Wating for Recruitment Officer to set the assessor
						</p>
					)}
					{user?.role === "recruitment_officer" &&
						applicant?.stages?.initial_interview?.status === "in-progress" && (
							<SubmitEvaluateButton id={params.id} />
						)}
					{user?.id === finalAssessor?.id &&
						currentInProgress?.assessed_by?.length ===
							currentInProgress?.rating_forms_id?.length && (
							<SubmitEvaluateButton id={params.id} />
						)}
				</CardFooter>
			</CardContent>
		</Card>
	);
}

function CardContainer({ children }: { children: React.ReactNode }) {
	return (
		<Card className="my-0 h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 h-auto w-full flex-col gap-5 p-5">{children}</CardContent>
		</Card>
	);
}
