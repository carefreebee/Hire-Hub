import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DisplayDate from "~/components/pages/authenticated/applicant/Card/DisplayDate";
import { LoadingAssessors } from "~/components/pages/authenticated/applicant/Card/SkeletonCard";
import {
	AssessorInfo,
	Waiting,
} from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import UpdateStatus from "~/components/pages/authenticated/applicant/Card/UdpateStatus";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { DisplayAssessedBy, DisplayFooter } from "~/components/pages/authenticated/stages/HigherUp";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRaitingFormByIdInEachStages } from "~/controller/RatingFormsController";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { User } from "~/lib/schema";
import { RatingFormWithUserData, ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";

const currentStageName = "Recommendation for Hiring";

export default async function RecommendationForHiringPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isRecruitmentOffier = user?.role === "recruitment_officer" || user?.role === "hr_head";
	const isHR = user?.role === "hr_head";
	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"recommendation_for_hiring"
	);

	const inProgress = applicantStage?.status === "in-progress";

	const getAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getAssessedBy);

	const ratingForm = await getAllRaitingFormByIdInEachStages(
		Number(params.id),
		applicantStage?.rating_forms_id as number[]
	);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">{currentStageName}</CardTitle>
				</CardHeader>
				{isRecruitmentOffier ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>
										{currentStageName}
									</TypographySmall>
									{isHR && (
										<div className="flex flex-col justify-start text-sm">
											Status:
											<SelectPassedOrFailed />
										</div>
									)}
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
						{isHR ? (
							<UpdateStatus
								id={applicant?.id as number}
								assessorId={user?.id as string} // Send the current user's ID as the assessor
							/>
						) : (
							<DisplayFooter
								userId={user?.id as string}
								status={applicantStage?.status as string}
								applicantId={Number(params.id)}
								users={(users as Partial<User>[]).filter(
									(u) => u.role === "hr_head"
								)}
								assessorsName={finalAssessor?.name as string | undefined}
								assessorsRole={finalAssessor?.role as string | undefined}
							/>
						)}
					</>
				) : (
					<>
						{inProgress && !applicantStage.assessed_by?.length ? (
							<Waiting />
						) : applicantStage?.status === "passed" ? (
							<CardContent className="mt-0 items-center justify-center font-semibold text-slate-500">
								Applicant has completed the recruitment process.
							</CardContent>
						) : user?.role === "hr_head" ? (
							<CardContent className="mt-0 items-center justify-center font-semibold text-slate-500">
								Please proceed to the evaluate tab.
							</CardContent>
						) : !inProgress ? (
							<CardContent className="mt-0 items-center justify-center font-semibold text-slate-500">
								This applicant has not yet reached this stage.
							</CardContent>
						) : (
							<CardContent className="mt-0 items-center justify-center font-semibold text-slate-500">
								This applicant is in progress.
							</CardContent>
						)}

						<CardFooter className="p-5">
							{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
							<AssessorInfo
								finalAssessorName={finalAssessor?.name as string}
								finalAssessorRole={finalAssessor?.role as string}
							/>
						</CardFooter>
					</>
				)}
			</Card>

			<CommentsAndDocuments
				stage="recommendation_for_hiring"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
				document={ratingForm as Partial<RatingFormWithUserData>[]}
			/>
		</>
	);
}
