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
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import {
	DeptOrOfficeComponent,
	DeptOrOfficeFooter,
} from "~/components/pages/authenticated/stages/DeptOrOffice";
import {
	DisplayAssessedBy,
	DisplayFooter,
	DisplayMode,
} from "~/components/pages/authenticated/stages/HigherUp";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { ResumeProps } from "~/types/types";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { GetCurrentStage } from "~/util/get-current-stage";
import InitialInterviewModal from "./initial-interview-modal";

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

	//get status of currentstage
	const initialInterviewStatus = applicant?.stages?.initial_interview?.status;

	const getFirstIndexAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getFirstIndexAssessedBy);

	const ratingFormId = applicantStage?.rating_forms_id as number[];

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

	//ambot ngano ni, ako gicomment out kay ma hide ang initial interview if naa nay office_id ug selected_office
	// if (applicant?.office_id !== null && applicant?.selected_office !== null) {
	// 	return;
	// }

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						<div className="flex flex-col gap-4">
							Initial Interview
							<div className="font-mono text-[12px] italic">
								Add evaluators, set the date and click apply to save changes.
							</div>
						</div>
						{user && (
							<InitialInterviewModal
								applicantId={applicant?.id}
								userId={user.id}
								evaluatedBy={user}
							/>
						)}
					</CardTitle>
				</CardHeader>
				{isAllowedRole && initialInterviewStatus ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>Initial Interview</TypographySmall>

									<div className="flex flex-col">
										<DisplayMode
											status={applicantStage?.status as string}
											mode={applicantStage?.mode}
										/>

										<div className="mt-2">
											{initialInterviewStatus === "in-progress" ? (
												<SelectPassedOrFailed />
											) : (
												<Button
													variant={"outline"}
													disabled
													className={`${initialInterviewStatus === "passed" ? "text-green-500" : "text-[#7F0000]"}`}
												>
													{initialInterviewStatus === "passed"
														? "Passed"
														: "Failed"}
												</Button>
											)}
										</div>
									</div>
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
							userId={user?.id}
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
							hasUserPostedRating={true}
							status={applicantStage?.status || ""}
						/>

						<DeptOrOfficeFooter
							status={applicantStage?.status || ""}
							assessorsName={finalAssessor?.name || ""}
							assessorsRole={finalAssessor?.role || ""}
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
