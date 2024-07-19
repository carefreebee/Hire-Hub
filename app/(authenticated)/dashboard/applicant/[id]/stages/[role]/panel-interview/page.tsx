import dynamic from "next/dynamic";
import Link from "next/link";
import AddEvaluators from "~/components/pages/authenticated/applicant/Card/AddEvaluators";
import AssessedBy from "~/components/pages/authenticated/applicant/Card/AssessedBy";
import Assessor from "~/components/pages/authenticated/applicant/Card/Assessor";
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
import FinalStatus from "~/components/pages/authenticated/applicant/Card/FinalStatus";
import SubmitStagesForm from "~/components/pages/authenticated/applicant/Card/SubmitStagesForm";
import UploadRatingForm from "~/components/pages/authenticated/applicant/Card/UploadRatingForm";
import Waiting from "~/components/pages/authenticated/applicant/Card/Waiting";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectMode from "~/components/pages/authenticated/applicant/initial-interview/SelectMode";
import { Button } from "~/components/ui/button";
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

const currentStageName = "Panel Interview";

export default async function PanelInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await DisplayAssessedBy();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"panel_interview"
	);
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	const assessedByIds = applicantStage?.assessed_by || [];
	// console.log("Initial assessed_by IDs:", assessedByIds);
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
								{applicantStage?.status === "in-progress" ? (
									<SelectMode />
								) : (
									<FinalStatus status={applicantStage?.status as string} />
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
					<CardFooter>
						{applicantStage?.status === "in-progress" ? (
							<>
								<AddEvaluators id={applicant?.id as number} />
								<div className="flex-1">
									<CheckboxAssessedBy assessed_by={users as Partial<User>[]} />
								</div>
							</>
						) : (
							<div className="h-[40px]"></div>
						)}
					</CardFooter>
				</Card>
				<CommentsAndDocuments
					stage="panel_interview"
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
	// CHECK IF THE CURRENT USER HAS SUBMITTED THE RATING FORM
	// const hasUserPostedRating = ratingForm?.some((form) => form.user_id === user?.id);
	// console.log(applicantStage);
	// console.log(ratingForm.find((stage) => stage.recruitment_stage === currentStageName));
	// // CHECK THE CURRENT USER's ROLE
	// Check if the user has already posted a rating for the current stage
	const hasUserPostedRating = ratingForm.some(
		(stage) => stage.recruitment_stage === currentStageName && stage.user_id === user?.id
	);
	console.log(hasUserPostedRating); // true if the user has posted a rating, false otherwise

	const getAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getAssessedBy);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						{currentStageName && "Panel Interview"}
						<DownloadForm
							file={"/files/panel-interview-rating-scale.docx"}
							downloadText="Panel Interview Rating Form"
						>
							Download Panel Interview Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{/* CHECKS IF THE USER's DEPARTMENT/OFFICE MATCHES THE APPLICANT's SELECTED_DEPARTMENT/SELECTED_OFFICE */}
				{applicantStage?.status === "in-progress" && !applicantStage.assessed_by?.length ? (
					<Waiting />
				) : assessedByUsers && checkIfUserIsAllowedToAssess && !hasUserPostedRating ? (
					<CardContent className="mt-0 flex h-auto flex-col p-5">
						<InformationSVG />
						<UploadRatingForm />
					</CardContent>
				) : hasUserPostedRating ? (
					<CardContent className="mt-0 h-52 flex-col items-center justify-center">
						<p className="text-xl font-medium">Success!</p>
						<div className="mt-2 flex flex-col items-center">
							<small className="text-[#4F4F4F]">
								Rating form has been submitted successfully, check
							</small>
							<small className="text-[#4F4F4F]">your documents to view file.</small>
						</div>
					</CardContent>
				) : (
					<CardContent className="mt-0 items-center justify-center">
						Not authorized to assess.
					</CardContent>
				)}
				{applicantStage?.status === "in-progress" && (
					<CardFooter className="p-5">
						{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
						<Assessor
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
				stage="panel_interview"
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
