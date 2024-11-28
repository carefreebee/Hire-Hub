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
import InitialInterviewComponent from "~/components/pages/authenticated/applicant/initial-interview/InitialInterviewComponent";
import { DeptOrOfficeComponent, DeptOrOfficeFooter } from "~/components/pages/authenticated/stages/DeptOrOffice";
import { DisplayAssessedBy, DisplayFooter, DisplayMode } from "~/components/pages/authenticated/stages/HigherUp";
import { StageStatus } from "~/components/pages/authenticated/stages/Messages";
import { TypographySmall } from "~/components/ui/typography-small";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { ResumeProps } from "~/types/types";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { GetCurrentStage } from "~/util/get-current-stage";

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isAllowedRole = user?.role
		? ["recruitment_officer", "dean", "department_chair"].includes(user.role)
		: false;

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"initial_interview"
	);
	const ratingFormId = applicantStage?.rating_forms_id as number[];

	const getFirstIndexAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getFirstIndexAssessedBy);

	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
		applicant as ApplicantSelect,
		user as User
	);
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	const checkIfUserIsAllowedToAssess = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.id as string);

	// if (applicant?.office_id !== null && applicant?.selected_office !== null) {
	// 	return;
	// }

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						Initial Interview
						<DownloadForm
							file={"/files/initial-interview-rating-form.xlsx"}
							downloadText="Initial Interview Rating Form"
						>
							Download Initial Interview Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{isAllowedRole ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>
										Initial Interview
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
							assessorsName={finalAssessor?.name || "Unknown"}
							assessorsRole={finalAssessor?.role || "No role assigned"}
						/>
					</>
				) : (
					<>
						<DeptOrOfficeComponent
							assessorLength={applicantStage?.assessed_by?.length}
							assessedByUsers={assessedByUsers as boolean}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess as boolean}
							hasUserPostedRating={true}
							status={applicantStage?.status || ""}
						/>

						<DeptOrOfficeFooter
							status={applicantStage?.status || ""}
							assessorsName={finalAssessor?.name || "Unknown"}
							assessorsRole={finalAssessor?.role || "No role assigned"}
							assessedByUsers={assessedByUsers ?? false}
							checkIfUserIsAllowedToAssess={checkIfUserIsAllowedToAssess ?? false}
							hasUserPostedRating={true}
							applicantId={params.id}
							userId={user?.id || ""} // Default to an empty string if `user?.id` is undefined
							currentStageName={"Initial Interview"}
						/>
					</>
				)}
			</Card>

			<CommentsAndDocuments
				stage="initial_interview"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
				ratingFormId={ratingFormId}
			/>
		</>
	);
}

function LoadingCardComponent() {
	return (
		<CardContent>
			<CardSubContent>
				<CardTopLeftSubContent className="px-5">
					<p className="text-sm">Initial Interview</p>
					<div className="h-6 w-32 animate-pulse rounded-md bg-slate-400 py-1"></div>
				</CardTopLeftSubContent>
			</CardSubContent>
		</CardContent>
	);
}
