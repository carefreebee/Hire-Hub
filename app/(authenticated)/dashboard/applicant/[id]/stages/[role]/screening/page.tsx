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
import { AssessorInfo } from "~/components/pages/authenticated/applicant/Card/StatusDisplayComponents";
import UpdateDate from "~/components/pages/authenticated/applicant/Card/UdpateDate";
import UpdateStatus from "~/components/pages/authenticated/applicant/Card/UdpateStatus";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";

const DisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/Card/DisplayDate"),
	{
		ssr: false,
	}
);

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "screening");
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	const screening = "Screening";
	const isApplicantInProgress = applicantStage?.status === "in-progress";
	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>{screening}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardSubContent>
						<CardTopLeftSubContent>
							<TypographySmall size={"md"}>{screening}</TypographySmall>
							{isApplicantInProgress && isRecruitmentOfficer && (
								<SelectPassedOrFailed />
							)}
						</CardTopLeftSubContent>
						<DisplayDateNoSSR date={applicantStage?.date as Date} />
					</CardSubContent>
				</CardContent>
				{!applicantStage?.date && isRecruitmentOfficer ? (
					<CardFooter>
						<UpdateDate
							id={applicant?.id as number}
							date={applicantStage?.date as Date}
						/>
					</CardFooter>
				) : !isPassed && !isFailed && isRecruitmentOfficer ? (
					<CardFooter>
						<UpdateStatus
							id={applicant?.id as number}
							assessorId={user?.id as string}
						/>
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
			</Card>

			<CommentsAndDocuments
				stage="screening"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume_name={resume_name}
				resume_url={resume_url}
				letter_name={letter_name}
				letter_url={letter_url}
			/>
		</>
	);
}
