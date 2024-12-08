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
import UpdateStatus from "~/components/pages/authenticated/applicant/Card/UdpateStatus";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { DeptOrOfficeFooter } from "~/components/pages/authenticated/stages/DeptOrOffice";
import {
	DisplayAssessedBy,
	DisplayFooter,
	DisplayMode,
} from "~/components/pages/authenticated/stages/HigherUp";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRaitingFormByIdInEachStages } from "~/controller/RatingFormsController";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { User } from "~/lib/schema";
import { RatingFormWithUserData, ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";
import PanelInterViewModal from "./panel-interview-modal";

const currentStageName = "Panel Interview";

export default async function PanelInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isAllowedRole = user?.role
		? ["recruitment_officer", "dean", "department_chair"].includes(user.role)
		: false;

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"panel_interview"
	);

	//get status of currentstage
	const panelInterviewStatus = applicant?.stages?.panel_interview?.status;

	const getFirstIndexAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getFirstIndexAssessedBy);

	const ratingForm = await getAllRaitingFormByIdInEachStages(
		Number(params.id),
		applicantStage?.rating_forms_id as number[]
	);

	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.id as string);
	// GETTING ALL THE RATING FORMS FILES BY ID

	// Check if the user has already posted a rating for the current stage
	const hasUserPostedRating = ratingForm.some(
		(stage) => stage.recruitment_stage === currentStageName && stage.user_id === user?.id
	);
	// console.log(hasUserPostedRating); // true if the user has posted a rating, false otherwise

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						<div className="flex flex-col gap-4">
							Panel Interview
							<div className="font-mono text-[12px] italic">
								Add evaluators, set the date and click apply to save changes.
							</div>
						</div>
						<div className="jusitify-center flex items-center gap-2"></div>
					</CardTitle>
				</CardHeader>

				{isAllowedRole && panelInterviewStatus ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>
										{currentStageName}
									</TypographySmall>
									<div className="flex flex-col">
										<DisplayMode
											status={applicantStage?.status as string}
											mode={applicantStage?.mode}
										/>
										<div className="mt-2">
											{panelInterviewStatus === "in-progress" &&
											user?.role === "vp_acad_affairs" ? (
												<SelectPassedOrFailed />
											) : (
												<Button
													variant={"outline"}
													disabled
													className={`${
														panelInterviewStatus === "passed"
															? "text-green-500"
															: panelInterviewStatus === "failed"
																? "text-[#7F0000]"
																: ""
													}`}
												>
													{panelInterviewStatus === "passed"
														? "Passed"
														: panelInterviewStatus === "failed"
															? "Failed"
															: "In Progress"}
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
							userId={user?.id as string}
							status={applicantStage?.status as string}
							applicantId={Number(params.id)}
							users={users as Partial<User>[]}
							assessorsName={finalAssessor?.name as string | undefined}
							assessorsRole={finalAssessor?.role as string | undefined}
						/>
					</>
				) : (
					<>
						<div className="flex gap-3 p-3">
							{user && (
								<PanelInterViewModal
									applicantId={applicant?.id}
									userId={user.id}
									evaluatedBy={user}
								/>
							)}
							<a
								href={`/applicationform/${applicant?.id}/${user?.id}`}
								target="_blank"
							>
								<Button>Generate Application Form</Button>
							</a>
						</div>
						<div className="flex items-center justify-between p-2">
							<DisplayMode
								status={applicantStage?.status as string}
								mode={applicantStage?.mode}
							/>
							{panelInterviewStatus === "in-progress" ? (
								<SelectPassedOrFailed />
							) : (
								<Button
									variant={"outline"}
									disabled
									className={`${
										panelInterviewStatus === "passed"
											? "text-green-500"
											: panelInterviewStatus === "failed"
												? "text-[#7F0000]"
												: ""
									}`}
								>
									{panelInterviewStatus === "passed"
										? "Passed"
										: panelInterviewStatus === "failed"
											? "Failed"
											: "In Progress"}
								</Button>
							)}
							<UpdateStatus
								id={applicant?.id as number}
								assessorId={user?.id as string} // Send the current user's ID as the assessor
							/>
						</div>
						<div className="ml-4 text-[12px]">
							Scheduled Date and Time:{" "}
							<DisplayDate date={applicantStage?.date as Date} />
						</div>
						<DeptOrOfficeFooter
							status={applicantStage?.status as string | undefined}
							assessorsName={finalAssessor?.name as string | undefined}
							assessorsRole={finalAssessor?.role as string | undefined}
							assessedByUsers={assessedByUsers as boolean}
							hasUserPostedRating={hasUserPostedRating as boolean}
							applicantId={params.id as string}
							userId={user?.id as string}
							currentStageName={currentStageName}
						/>
						<DisplayFooter
							userId={user?.id as string}
							status={applicantStage?.status as string}
							applicantId={Number(params.id)}
							users={users as Partial<User>[]}
							assessorsName={finalAssessor?.name as string | undefined}
							assessorsRole={finalAssessor?.role as string | undefined}
						/>
					</>
				)}
			</Card>

			<CommentsAndDocuments
				stage="panel_interview"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
				document={ratingForm as Partial<RatingFormWithUserData>[]}
			/>
		</>
	);
}
