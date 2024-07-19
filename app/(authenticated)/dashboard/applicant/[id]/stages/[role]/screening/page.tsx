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
import FinalStatus from "~/components/pages/authenticated/applicant/Card/FinalStatus";
import UpdateDate from "~/components/pages/authenticated/applicant/Card/UdpateDate";
import UpdateStatus from "~/components/pages/authenticated/applicant/Card/UdpateStatus";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { formattedName } from "~/util/formatted-name";
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
							{isApplicantInProgress && isRecruitmentOfficer ? (
								<SelectPassedOrFailed />
							) : (
								<FinalStatus status={applicantStage?.status as string} />
							)}
						</CardTopLeftSubContent>
						<DisplayDateNoSSR date={applicantStage?.date as Date} />
					</CardSubContent>
					{/* <CardSubContent>
						<AssessedBy
							status={applicantStage?.status as "passed" | "failed"}
							assessedByName={assessedByIds}
							assessedByRole={assessedBy?.role as string}
						/>
					</CardSubContent> */}
				</CardContent>
				<CardFooter>
					{!applicantStage?.date && isRecruitmentOfficer ? (
						<UpdateDate
							id={applicant?.id as number}
							date={applicantStage?.date as Date}
						/>
					) : applicantStage?.status !== "passed" && isRecruitmentOfficer ? (
						<UpdateStatus
							id={applicant?.id as number}
							assessorId={user?.id as string}
						/>
					) : (
						<div className="h-[40px]"></div>
					)}
				</CardFooter>
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
