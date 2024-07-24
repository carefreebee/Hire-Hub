import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-current-stage";
import { ScreeningAndInitial } from "../Card/StatusDisplayComponents";
import SelectPassedOrFailed from "./SelectPassedOrFailed";

export default async function CardContentComponent({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();

	const { applicantStage } = await GetCurrentStage(applicantId, "screening");

	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

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
