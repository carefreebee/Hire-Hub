import { User } from "lucia";
import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DisplayDate from "~/components/pages/authenticated/applicant/Card/DisplayDate";
import DownloadForm from "~/components/pages/authenticated/applicant/Card/DownloadForm";
import { LoadingAssessors } from "~/components/pages/authenticated/applicant/Card/SkeletonCard";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import {
	DeptOrOfficeComponent,
	DeptOrOfficeFooter,
} from "~/components/pages/authenticated/stages/DeptOrOffice";
import {
	DisplayAssessedBy,
	DisplayFooter,
	DisplayMode,
} from "~/components/pages/authenticated/stages/HigherUp";

import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRaitingFormByIdInEachStages } from "~/Controller/RatingFormsController";
import { getUsersWithoutUserRoles } from "~/Controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { RatingFormWithUserData, ResumeProps } from "~/types/types";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { GetCurrentStage } from "~/util/get-current-stage";

const currentStageName = "Teaching Demo";

export default async function TeachingDemoPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isRecruitmentOffier = user?.role === "recruitment_officer";

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "teaching_demo");

	const getFirstIndexAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getFirstIndexAssessedBy);

	const ratingForm = await getAllRaitingFormByIdInEachStages(
		Number(params.id),
		applicantStage?.rating_forms_id as number[]
	);

	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
		applicant as ApplicantSelect,
		user as User
	);
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	const checkIfUserIsAllowedToAssess = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.id as string);
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
						{!isRecruitmentOffier && (
							<DownloadForm
								file={"/files/teaching-demonstration-rating-scaling.docx"}
								downloadText="Teaching Demo Interview Rating Form"
							>
								Download Teaching Demo Rating Form
							</DownloadForm>
						)}
					</CardTitle>
				</CardHeader>

				{isRecruitmentOffier ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>
										{currentStageName}
									</TypographySmall>
									<DisplayMode
										status={applicantStage?.status as string}
										mode={applicantStage?.mode}
									/>
								</CardTopLeftSubContent>

								<DisplayDate date={applicantStage?.date as Date} />
							</CardSubContent>
							<CardSubContent>
								<TypographySmall size={"md"}>Assessed by:</TypographySmall>
								<Suspense fallback={<LoadingAssessors />}>
									<DisplayAssessedBy
										assessedById={applicantStage?.assessed_by || []}
									/>
								</Suspense>
							</CardSubContent>
						</CardContent>

						<DisplayFooter
							status={applicantStage?.status as string}
							applicantId={Number(params.id)}
							users={users as Partial<User>[]}
							assessorsName={finalAssessor?.name as string | undefined}
							assessorsRole={finalAssessor?.role as string | undefined}
						/>
					</>
				) : (
					<>
						<DeptOrOfficeComponent
							assessorLength={applicantStage?.assessed_by?.length}
							assessedByUsers={assessedByUsers as boolean}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess as boolean}
							hasUserPostedRating={hasUserPostedRating as boolean}
							status={applicantStage?.status as string | undefined}
						/>

						<DeptOrOfficeFooter
							status={applicantStage?.status as string | undefined}
							assessorsName={finalAssessor?.name as string | undefined}
							assessorsRole={finalAssessor?.role as string | undefined}
							assessedByUsers={assessedByUsers as boolean}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess as boolean}
							hasUserPostedRating={hasUserPostedRating as boolean}
							applicantId={params.id as string}
							userId={user?.id as string}
							currentStageName={currentStageName}
						/>
					</>
				)}
			</Card>

			<CommentsAndDocuments
				stage="teaching_demo"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
				document={ratingForm as Partial<RatingFormWithUserData>[]}
			/>
		</>
	);
}
