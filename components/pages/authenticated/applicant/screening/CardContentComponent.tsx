import { validateRequest } from "~/lib/auth";
import { ScreeningAndInitial } from "../Card/StatusDisplayComponents";
import { GetCurrentStage } from "~/util/get-current-stage";
import { ResumeProps } from "~/types/types";
import SelectPassedOrFailed from "./SelectPassedOrFailed";

export default async function CardContentComponent({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();

	const { applicant, applicantStage } = await GetCurrentStage(applicantId, "screening");
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	const screening = "Screening";
	const isApplicantInProgress = applicantStage?.status === "in-progress";
	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	return (
		<>
			{isApplicantInProgress && isRecruitmentOfficer ? (
				<SelectPassedOrFailed />
			) : (
				(isPassed || isFailed) && (
					<ScreeningAndInitial status={applicantStage?.status as string} />
				)
			)}
		</>
	);
}
