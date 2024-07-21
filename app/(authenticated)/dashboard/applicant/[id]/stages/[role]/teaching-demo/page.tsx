import dynamic from "next/dynamic";
import AddEvaluators from "~/components/pages/authenticated/applicant/Card/AddEvaluators";
import AssessedBy from "~/components/pages/authenticated/applicant/Card/AssessedBy";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import CheckboxAssessedBy from "~/components/pages/authenticated/applicant/Card/CheckboxAssessedBy";
import DownloadForm from "~/components/pages/authenticated/applicant/Card/DownloadForm";
import {
	AssessorInfo,
	FinalStatus,
	Waiting,
} from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import SubmitStagesForm from "~/components/pages/authenticated/applicant/Card/SubmitStagesForm";
import UploadRatingForm from "~/components/pages/authenticated/applicant/Card/UploadRatingForm";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectMode from "~/components/pages/authenticated/applicant/initial-interview/SelectMode";
import { StageStatus, UploadSuccess } from "~/components/pages/authenticated/Messages";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRatingFormsFilesById, getRatingFormsById } from "~/Controller/RatingFormsController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect, User } from "~/lib/schema";
import { AssessedByUserDetails, ResumeProps } from "~/types/types";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { DisplayAssessedBy } from "~/util/display-assessed-by";
import { GetCurrentStage } from "~/util/get-current-stage";
import { MatchingUser } from "~/util/matching-users";

const DisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/Card/DisplayDate"),
	{
		ssr: false,
	}
);

const currentStageName = "Teaching Demo";

export default async function TeachingDemoPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await DisplayAssessedBy();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "teaching_demo");
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;
	const inProgress = applicantStage?.status === "in-progress";
	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	const getAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getAssessedBy);

	// GETTING ALL THE ASSESSED BY
	const assessedByIds = applicantStage?.assessed_by || [];

	const assessors = await MatchingUser(assessedByIds);

	const documentIds = (applicantStage?.rating_forms_id as number[]) || [];
	const documentPromises = documentIds.map((id) => getRatingFormsById(id));
	const documentResults = await Promise.all(documentPromises);
	const document = documentResults.flat();

	if (user?.role === "recruitment_officer") {
		return (
			<>
				<Card>
					<CardHeader>
						<CardTitle>{currentStageName}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardSubContent>
							<CardTopLeftSubContent>
								<TypographySmall size={"md"}>{currentStageName}</TypographySmall>
								{inProgress ? (
									<SelectMode />
								) : (
									(isPassed || isFailed) && (
										<FinalStatus mode={applicantStage?.mode as string} />
									)
								)}
							</CardTopLeftSubContent>
							<DisplayDateNoSSR date={applicantStage?.date as Date} />
						</CardSubContent>
						<CardSubContent>
							<AssessedBy
								isThereAssessors={assessedByIds}
								assessors={assessors as AssessedByUserDetails[]}
							/>
						</CardSubContent>
					</CardContent>

					{applicantStage?.status === "in-progress" ? (
						<CardFooter>
							<AddEvaluators id={applicant?.id as number} />
							<div className="flex-1">
								<CheckboxAssessedBy assessed_by={users as Partial<User>[]} />
							</div>
						</CardFooter>
					) : (
						<CardFooter className="p-5">
							<AssessorInfo
								finalAssessorName={finalAssessor?.name as string}
								finalAssessorRole={finalAssessor?.role as string}
							/>
						</CardFooter>
					)}
				</Card>

				<CommentsAndDocuments
					stage="teaching_demo"
					applicantId={params.id as string}
					evaluatorsId={user?.id as string}
					resume_name={resume_name}
					resume_url={resume_url}
					letter_name={letter_name}
					letter_url={letter_url}
					document={document}
					users={users}
				/>
			</>
		);
	}

	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
		applicant as ApplicantSelect,
		user as User
	);
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	const checkIfUserIsAllowedToAssess = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.id as string);
	// GETTING ALL THE RATING FORMS FILES BY ID
	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	// Check if the user has already posted a rating for the current stage
	const hasUserPostedRating = ratingForm.some(
		(stage) => stage.recruitment_stage === currentStageName && stage.user_id === user?.id
	);
	// console.log(hasUserPostedRating); // true if the user has posted a rating, false otherwise

	if (applicant?.office_id !== null && applicant?.selected_office !== null) {
		return;
	}

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						{currentStageName}
						<DownloadForm
							file={"/files/teaching-demonstration-rating-scaling.docx"}
							downloadText="Teaching Demo Interview Rating Form"
						>
							Download Teaching Demo Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{/* CHECKS IF THE USER's DEPARTMENT/OFFICE MATCHES THE APPLICANT's SELECTED_DEPARTMENT/SELECTED_OFFICE */}
				{inProgress && !applicantStage.assessed_by?.length ? (
					<Waiting />
				) : assessedByUsers && checkIfUserIsAllowedToAssess && !hasUserPostedRating ? (
					<CardContent className="mt-0 flex h-auto flex-col p-5">
						<InformationSVG />
						<UploadRatingForm />
					</CardContent>
				) : hasUserPostedRating ? (
					<UploadSuccess />
				) : (
					<StageStatus status={applicantStage?.status as string} />
				)}
				{applicantStage?.status === "in-progress" && (
					<CardFooter className="p-5">
						{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
						<AssessorInfo
							finalAssessorName={finalAssessor?.name as string}
							finalAssessorRole={finalAssessor?.role as string}
						/>
						{/* BELOW IS WHERE THE FORM IS LOCATED SO THAT THE APPLICANT STATUS WILL BE UPDATED */}
						{assessedByUsers &&
							checkIfUserIsAllowedToAssess &&
							!hasUserPostedRating && (
								<SubmitStagesForm
									id={params.id}
									evaluatorsId={user?.id as string}
									recruitment_stage={currentStageName as string}
								/>
							)}
					</CardFooter>
				)}
			</Card>

			<CommentsAndDocuments
				stage="teaching_demo"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume_name={resume_name}
				resume_url={resume_url}
				letter_name={letter_name}
				letter_url={letter_url}
				document={document}
				users={users}
			/>
		</>
	);
}
