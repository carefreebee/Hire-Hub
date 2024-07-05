import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import AssessedBy from "~/components/pages/authenticated/applicant/evaluate/AssessedBy";
import EvaluateDisplay from "~/components/pages/authenticated/applicant/evaluate/EvaluateDisplay";
import SubmitEvaluateButton from "~/components/pages/authenticated/applicant/initial-interview/SubmitEvaluateButton";
import { getAllRatingFormsFilesById } from "~/controller/RatingFormsController";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RatingFormWithUserData } from "~/types/types";
import { getCurrentStatus, mergeRatingFormData } from "~/util/check-status-in-progress";

export default async function EvaluatePage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));

	if (!ratingForm) {
		return <CardContainer>No Rating Form yet.</CardContainer>;
	}

	const mergedData = await mergeRatingFormData(ratingForm);

	const { stages } = await getApplicantData(Number(params.id));
	const { currentStatus, finalSubmitter } = getCurrentStatus(stages);
	// const nameSubmitter = getSubmitterName(mergedData, finalSubmitter as string);
	const nameSubmitter = mergedData.find((role) => role.role === user?.name);
	console.log(stages);
	// 	{
	//     name: 'Initial Interview',
	//     status: 'in-progress',
	//     assessed_by: [ 'department_chair', 'dean' ]
	//   },

	const assessors = stages.find((stage) => stage.status === "in-progress" && stage.assessed_by);
	const checkIfAssessedByIsComplete = assessors
		? assessors.assessed_by?.length === ratingForm.length
		: false;

	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 flex h-[550px] w-full flex-col justify-between gap-5 p-5">
				<EvaluateDisplay mergedData={mergedData as RatingFormWithUserData[]} />
				<CardFooter className="pt-5">
					<AssessedBy
						nameSubmitter={nameSubmitter as string}
						finalSubmitter={finalSubmitter as string}
					/>
					{user?.role === finalSubmitter && checkIfAssessedByIsComplete && (
						<SubmitEvaluateButton id={params.id} currentStatus={currentStatus} />
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
