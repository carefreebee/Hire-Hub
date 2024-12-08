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
import { DisplayFooterView } from "~/components/pages/authenticated/stages/DisplayFooterView";
import { DisplayAssessedBy, DisplayMode } from "~/components/pages/authenticated/stages/HigherUp";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRaitingFormByIdInEachStages } from "~/controller/RatingFormsController";
import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { User } from "~/lib/schema";
import { RatingFormWithUserData, ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";

const currentStageName = "Psychological Exam";

export default async function PsychologicalExamPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isRecruitmentOffier = user?.role === "recruitment_officer";

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await getUsersWithoutUserRoles();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"psychological_exam"
	);

	const getFirstIndexAssessedBy = applicantStage?.assessed_by?.[0] ?? "";
	// GETTING THE FINAL ASSESSOR BASED ON THE USER ID
	const finalAssessor = users.find((user) => user.id === getFirstIndexAssessedBy);

	const ratingForm = await getAllRaitingFormByIdInEachStages(
		Number(params.id),
		applicantStage?.rating_forms_id as number[]
	);

	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.id as string);

	// Check if the user has already posted a rating for the current stage
	const hasUserPostedRating = ratingForm.some(
		(stage) => stage.recruitment_stage === currentStageName && stage.user_id === user?.id
	);
	// console.log(hasUserPostedRating); // true if the user has posted a rating, false otherwise

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

						<DisplayFooterView
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
							hasUserPostedRating={hasUserPostedRating as boolean}
							status={applicantStage?.status as string | undefined}
							stageName={currentStageName}
						/>

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
					</>
				)}
			</Card>

			<CommentsAndDocuments
				stage="psychological_exam"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
				document={ratingForm as Partial<RatingFormWithUserData>[]}
			/>
		</>
	);
}
