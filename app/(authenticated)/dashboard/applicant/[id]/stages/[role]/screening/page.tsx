import dynamic from "next/dynamic";
import CommentsAndDocuments from "~/components/pages/applicant/CommentsAndDocuments";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import AssessedBy from "~/components/pages/authenticated/applicant/AssessedBy";
import ApplicantIDUpdateDateFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateDateFooter";
import ApplicantIDUpdateStatusFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateStatusFooter";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getUsersByUserID } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { GetApplicantById } from "~/util/get-applicant-by-id";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/screening/ApplicantIDDisplayDate"),
	{
		ssr: false,
	}
);

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { applicant, applicantStage } = await GetApplicantById(Number(params.id), "screening");
	const { user } = await validateRequest();
	const getUserWhoAssessed = await getUsersByUserID(applicantStage?.assessed_by?.[0] ?? "");
	const assessedBy = getUserWhoAssessed?.find((user) => ({
		name: user.name,
		role: user.role,
	}));

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
						<AssessedBy
							status={applicantStage?.status as "passed" | "failed"}
							assessedByName={assessedBy?.name as string}
							assessedByRole={assessedBy?.role as string}
						/>
					</CardSubContent>
				</CardContent>
				<CardFooter>
					{!applicantStage?.date && isRecruitmentOfficer ? (
						<ApplicantIDUpdateDateFooter
							id={applicant?.id as number}
							date={applicantStage?.date as Date}
						/>
					) : applicantStage?.status !== "passed" && isRecruitmentOfficer ? (
						<ApplicantIDUpdateStatusFooter
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
			/>
		</>
	);
}
