import dynamic from "next/dynamic";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DownloadForm from "~/components/pages/authenticated/applicant/Card/DownloadForm";
import { AssessorInfo } from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import SubmitStagesForm from "~/components/pages/authenticated/applicant/Card/SubmitStagesForm";
import UpdateDate from "~/components/pages/authenticated/applicant/Card/UdpateDate";
import UploadRatingForm from "~/components/pages/authenticated/applicant/Card/UploadRatingForm";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import { StageStatus, UploadSuccess } from "~/components/pages/authenticated/Messages";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRatingFormsFilesById, getRatingFormsById } from "~/Controller/RatingFormsController";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { DisplayAssessedBy } from "~/util/display-assessed-by";
import { GetCurrentStage } from "~/util/get-current-stage";

const DisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/Card/DisplayDate"),
	{
		ssr: false,
	}
);

const currentStageName = "Initial Interview";

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"initial_interview"
	);
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	const inProgress = applicantStage?.status === "in-progress";
	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await DisplayAssessedBy();

	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	const isRatingFormSubmitted = ratingForm?.length > 0;

	const documentIds = (applicantStage?.rating_forms_id as number[]) || [];
	const documentPromises = documentIds.map((id) => getRatingFormsById(id));
	const documentResults = await Promise.all(documentPromises);
	const document = documentResults.flat();

	if (user?.role === "recruitment_officer") {
		return (
			<>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-between">
							{currentStageName}
							<DownloadForm
								file={"/files/initial-interview-rating-form.xlsx"}
								downloadText="Initial Interview Rating Form"
							>
								Download Initial Interview Rating Form
							</DownloadForm>
						</CardTitle>
					</CardHeader>
					{isPassed && <DisplayIfPassed date={applicantStage?.date as Date} />}
					{isFailed && <DisplayIfPassed date={applicantStage?.date as Date} />}

					{isRecruitmentOfficer && !applicantStage?.date ? (
						<>
							<DisplayIfPassed date={applicantStage?.date as Date} />
							<SetDate
								applicantId={applicant?.id as number}
								date={applicantStage?.date as Date}
								inProgress={inProgress}
								isRecruitmentOfficer={isRecruitmentOfficer}
							/>
						</>
					) : !isRatingFormSubmitted ? (
						<UploadForm applicantId={params.id} userId={user?.id as string} />
					) : (
						inProgress && <UploadSuccess />
					)}

					{(isPassed || isFailed) && (
						<CardFooter className="p-5">
							<AssessorInfo
								finalAssessorName={
									(isRecruitmentOfficer && (user?.name as string)) || ""
								}
								finalAssessorRole="Recruitment Officer"
							/>
						</CardFooter>
					)}
				</Card>

				<CommentsAndDocuments
					stage="initial_interview"
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

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						{currentStageName}
						<DownloadForm
							file={"/files/initial-interview-rating-form.xlsx"}
							downloadText="Initial Interview Rating Form"
						>
							Download Initial Interview Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{(isPassed || isFailed || inProgress) && (
					<StageStatus status={applicantStage?.status as string} />
				)}
			</Card>

			<CommentsAndDocuments
				stage="initial_interview"
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

function DisplayIfPassed({ date }: { date: Date }) {
	return (
		<CardContent>
			<CardSubContent>
				<CardTopLeftSubContent>
					<TypographySmall size={"md"}>{currentStageName}</TypographySmall>
				</CardTopLeftSubContent>
				<DisplayDateNoSSR date={date as Date} />
			</CardSubContent>
		</CardContent>
	);
}

type SetDateProps = {
	applicantId: number;
	date: Date;
	inProgress: boolean;
	isRecruitmentOfficer: boolean;
};

function SetDate({ applicantId, date, inProgress, isRecruitmentOfficer }: SetDateProps) {
	return (
		<CardFooter>
			{isRecruitmentOfficer && inProgress && !date ? (
				<UpdateDate id={applicantId as number} date={date as Date} />
			) : (
				<div className="h-[40px]"></div>
			)}
		</CardFooter>
	);
}

type UploadFormProps = {
	applicantId: string;
	userId: string;
};

function UploadForm({ applicantId, userId }: UploadFormProps) {
	return (
		<>
			<CardContent className="mt-0 flex h-auto flex-col p-5">
				<InformationSVG />
				<UploadRatingForm />
			</CardContent>
			<CardFooter className="justify-end px-5 py-4">
				<SubmitStagesForm
					id={applicantId as string}
					evaluatorsId={userId as string}
					recruitment_stage={currentStageName as string}
				/>
			</CardFooter>
		</>
	);
}
