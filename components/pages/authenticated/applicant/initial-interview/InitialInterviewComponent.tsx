import {
	CardContent,
	CardFooter,
	CardSubContent,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import {
	AssessorInfo,
	ScreeningAndInitial,
} from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import SubmitStagesForm from "~/components/pages/authenticated/applicant/Card/SubmitStagesForm";
import UpdateDate from "~/components/pages/authenticated/applicant/Card/UdpateDate";
import UploadRatingForm from "~/components/pages/authenticated/applicant/Card/UploadRatingForm";
import { UploadSuccess } from "~/components/pages/authenticated/stages/Messages";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRatingFormsFilesById } from "~/controller/RatingFormsController";
import { User } from "~/lib/schema";
import { GetCurrentStage } from "~/util/get-current-stage";
import DisplayDate from "../Card/DisplayDate";

type InitialInterviewComponentProps = {
	user: User;
	applicantId: number;
};

export default async function InitialInterviewComponent({
	user,
	applicantId,
}: InitialInterviewComponentProps) {
	const isRecruitmentOfficer = user?.role === "recruitment_officer";
	const { applicant, applicantStage } = await GetCurrentStage(applicantId, "initial_interview");

	const inProgress = applicantStage?.status === "in-progress";
	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	const ratingForm = await getAllRatingFormsFilesById(applicantId);
	const isRatingFormSubmitted = ratingForm?.length > 0;

	return (
		<>
			{(isPassed || isFailed) && (
				<DisplayIfPassed
					date={applicantStage?.date as Date}
					status={applicantStage?.status}
				/>
			)}

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
				<UploadForm applicantId={applicantId} userId={user?.id as string} />
			) : (
				inProgress && <UploadSuccess />
			)}

			{(isPassed || isFailed) && (
				<CardFooter className="p-5">
					<AssessorInfo
						finalAssessorName={(isRecruitmentOfficer && (user?.name as string)) || ""}
						finalAssessorRole="Recruitment Officer"
					/>
				</CardFooter>
			)}
		</>
	);
}

function DisplayIfPassed({ date, status }: { date: Date; status?: string }) {
	return (
		<CardContent>
			<CardSubContent>
				<CardTopLeftSubContent>
					<TypographySmall size={"md"}>Initial Interivew</TypographySmall>
					<ScreeningAndInitial status={status as string} />
				</CardTopLeftSubContent>
				<DisplayDate date={date as Date} />
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
	applicantId: number;
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
					id={applicantId.toString()}
					evaluatorsId={userId as string}
					recruitment_stage={"Initial Interview"}
				/>
			</CardFooter>
		</>
	);
}
