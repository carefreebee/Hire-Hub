import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DownloadForm from "~/components/pages/authenticated/applicant/Card/DownloadForm";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import InitialInterviewComponent from "~/components/pages/authenticated/applicant/initial-interview/InitialInterviewComponent";
import { StageStatus } from "~/components/pages/authenticated/stages/Messages";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";
import InitialInterviewModal from "./initial-interview-modal";

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"initial_interview"
	);
	const ratingFormId = applicantStage?.rating_forms_id as number[];

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						Initial Interview
						<InitialInterviewModal />
					</CardTitle>
				</CardHeader>
				{!isRecruitmentOfficer && <StageStatus status={applicantStage?.status as string} />}

				{isRecruitmentOfficer && (
					<Suspense fallback={<LoadingCardComponent />}>
						<InitialInterviewComponent user={user} applicantId={Number(params.id)} />
					</Suspense>
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
