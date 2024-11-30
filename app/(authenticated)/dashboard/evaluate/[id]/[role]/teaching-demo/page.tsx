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
import { getAllRaitingFormByIdInEachStages } from "~/controller/RatingFormsController";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { RatingFormWithUserData, ResumeProps } from "~/types/types";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { GetCurrentStage } from "~/util/get-current-stage";
import TeachingDemoModal from "./teaching-demo-modal";

const currentStageName = "Teaching Demo";

export default async function TeachingDemoPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isAllowedRole = user?.role
		? ["recruitment_officer", "dean", "department_chair"].includes(user.role)
		: false;

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "teaching_demo");

	// Get the status of teaching_demo stage only if initial_interview is passed
	const teachingdemostatus =
		applicant?.stages?.initial_interview?.status === "passed" ||
		applicant?.stages?.teaching_demo?.status;

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
						Teaching Demo
						{user && (
							<TeachingDemoModal
								applicantId={applicant?.id}
								userId={user.id}
								evaluatedBy={user}
							/>
						)}
					</CardTitle>
				</CardHeader>

				{isAllowedRole && teachingdemostatus ? (
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
							status={applicantStage?.status || ""}
							applicantId={Number(params.id)}
							users={users as Partial<User>[]}
							assessorsName={finalAssessor?.name || ""}
							assessorsRole={finalAssessor?.role || ""}
						/>
					</>
				) : (
					<>
						<DeptOrOfficeComponent
							assessorLength={applicantStage?.assessed_by?.length}
							assessedByUsers={assessedByUsers as boolean}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess as boolean}
							hasUserPostedRating={hasUserPostedRating as boolean}
							status={applicantStage?.status || ""}
						/>

						<DeptOrOfficeFooter
							status={applicantStage?.status || ""}
							assessorsName={finalAssessor?.name || ""}
							assessorsRole={finalAssessor?.role || ""}
							assessedByUsers={assessedByUsers ?? false}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess ?? false}
							hasUserPostedRating={hasUserPostedRating ?? false}
							applicantId={params.id}
							userId={user?.id || ""} // Default to an empty string if `user?.id` is undefined
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
