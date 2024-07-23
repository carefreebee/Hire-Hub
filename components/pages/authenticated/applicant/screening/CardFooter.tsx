import {
	CardFooter,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-current-stage";
import { AssessorInfo } from "../Card/StatusDisplayComponents";
import UpdateDate from "../Card/UdpateDate";
import UpdateStatus from "../Card/UdpateStatus";
import DisplayDate from "../Card/DisplayDate";

export default async function CardFooterComponent({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(applicantId, "screening");

	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";
	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	return (
		<>
			{!applicantStage?.date && isRecruitmentOfficer ? (
				<CardFooter>
					<UpdateDate id={applicant?.id as number} date={applicantStage?.date as Date} />
				</CardFooter>
			) : !isPassed && !isFailed && isRecruitmentOfficer ? (
				<CardFooter>
					<UpdateStatus id={applicant?.id as number} assessorId={user?.id as string} />
				</CardFooter>
			) : (
				(isPassed || isFailed) && (
					<CardFooter className="p-5">
						<AssessorInfo
							finalAssessorName={
								(isRecruitmentOfficer && (user?.name as string)) || ""
							}
							finalAssessorRole="Recruitment Officer"
						/>
					</CardFooter>
				)
			)}
			
		</>
	);
}
