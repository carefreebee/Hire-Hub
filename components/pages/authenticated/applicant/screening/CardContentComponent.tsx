import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { formattedNameAndRole } from "~/util/formatted-name";
import { GetCurrentStage } from "~/util/get-current-stage";
import SelectPassedOrFailed from "./SelectPassedOrFailed";

export default async function CardContentComponent({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();

	const { applicantStage } = await GetCurrentStage(applicantId, "screening");

	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	const isApplicantInProgress = applicantStage?.status === "in-progress";
	const isRecruitmentOfficer = user?.role === "dean" || "department_chair";

	return (
		<>
			{isApplicantInProgress && isRecruitmentOfficer ? (
				<div className="flex">
					<TypographySmall size={"md"}>Status:</TypographySmall> <SelectPassedOrFailed />
				</div>
			) : (
				(isPassed || isFailed) && (
					<div className="flex">
						<TypographySmall size={"md"}>Status:</TypographySmall>{" "}
						<Button
							variant={"outline"}
							disabled
							className={`${applicantStage.status === "passed" ? "text-green-500" : "text-[#7F0000]"}`}
						>
							{formattedNameAndRole(applicantStage?.status as string, "_")}
						</Button>
					</div>
				)
			)}
		</>
	);
}
