import dynamic from "next/dynamic";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CommentsAndDocuments";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import UpdateDate from "~/components/pages/authenticated/applicant/UdpateDate";
import UpdateStatus from "~/components/pages/authenticated/applicant/UdpateStatus";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-current-stage";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/screening/ApplicantIDDisplayDate"),
	{
		ssr: false,
	}
);

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "screening");

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
								<Button
									variant={"outline"}
									disabled
									className="h-auto w-32 py-1 text-[#039E38]"
								>
									{applicantStage?.status}
								</Button>
							)}
						</CardTopLeftSubContent>
						<ApplicantIDDisplayDateNoSSR date={applicantStage?.date as Date} />
					</CardSubContent>
					<CardSubContent>
						{/* <AssessedBy
							status={applicantStage?.status as "passed" | "failed"}
							assessedByName={assessedByIds}
							assessedByRole={assessedBy?.role as string}
						/> */}
					</CardSubContent>
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
				resume={applicant?.resume as string}
			>
				<Button
					variant={"outline"}
					asChild
					className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
				>
					<Link href={applicant?.resume as string} target="_blank">
						Resume
					</Link>
				</Button>
			</CommentsAndDocuments>
		</>
	);
}
