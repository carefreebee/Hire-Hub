import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { AssessorInfo } from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import EvaluateComponent from "~/components/pages/authenticated/applicant/evaluate/EvaluateComponent";
import SubmitEvaluateButton from "~/components/pages/authenticated/applicant/initial-interview/SubmitEvaluateButton";
import { getAllRatingFormsFilesById } from "~/Controller/RatingFormsController";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RatingFormWithUserData } from "~/types/types";
import { DisplayAssessedBy } from "~/util/display-assessed-by";
import { RatingForms } from "~/util/rating-forms";

export default async function EvaluatePage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const getFinalAssessor = await DisplayAssessedBy();

	// GETTING THE APPLICANT BY ID
	const { applicant, stages } = await getApplicantData(Number(params.id));

	// FINDING THE IN PROGRESS STATUS BASED ON THE STAGES
	const currentInProgress = stages.find((stage) => stage.status === "in-progress");

	// GET THE FIRST ASSESSOR BASED ON THE CURRENT IN PROGRESS
	const getAssessedBy = currentInProgress?.assessed_by?.[0] ?? "";

	// FINDING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = getFinalAssessor?.find((user) => user.id === getAssessedBy);

	// GETTING THE RATING FORM
	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	if (!ratingForm) {
		return <CardContainer>No Rating Form yet.</CardContainer>;
	}

	// MERGING THE RATING FORM DATA
	const mergedData = await RatingForms(ratingForm);

	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 flex h-[550px] w-full flex-col justify-between gap-5 p-5">
				<EvaluateComponent mergedData={mergedData as RatingFormWithUserData[]} />
				<CardFooter className="pt-5">
					{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
					{finalAssessor ? (
						<AssessorInfo
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

					{/* ROLES THAT ARE ASSIGNED TO THE DEPARTMENT OR OFFICES */}
					{user?.id === finalAssessor?.id &&
						currentInProgress?.assessed_by?.length ===
							currentInProgress?.rating_forms_id?.length && (
							<SubmitEvaluateButton id={params.id} />
						)}

					{user?.role === "univ_president" && user?.id === finalAssessor?.id && (
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
