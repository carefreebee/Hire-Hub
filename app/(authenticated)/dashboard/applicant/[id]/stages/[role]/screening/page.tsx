import dynamic from "next/dynamic";
import HrPageFooter from "~/components/pages/applicant/HrPageFooter";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import ApplicantIDAssessedBy from "~/components/pages/authenticated/applicant/screening/ApplicantIDAssessedBy";
import ApplicantIDUpdateDateFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateDateFooter";
import ApplicantIDUpdateStatusFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateStatusFooter";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/screening/ApplicantIDDisplayDate"),
	{
		ssr: false,
	}
);

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const applicant = await getApplicantFormByID(Number(params.id));
	const Screening = applicant?.stages?.screening && "Screening";

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>{Screening}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardSubContent>
						<CardTopLeftSubContent>
							<TypographySmall size={"md"}>{Screening}</TypographySmall>
							{applicant?.stages?.screening.status === "in-progress" ? (
								<SelectPassedOrFailed />
							) : (
								<Button
									variant={"outline"}
									disabled
									className="h-auto w-32 py-1 text-[#039E38]"
								>
									{applicant?.stages?.screening.status}
								</Button>
							)}
						</CardTopLeftSubContent>
						<ApplicantIDDisplayDateNoSSR
							date={applicant?.stages?.screening?.date as Date}
						/>
					</CardSubContent>
					<CardSubContent>
						<TypographySmall size={"md"} className="px-0">
							Assessed by:
						</TypographySmall>
						<ApplicantIDAssessedBy
							status={applicant?.stages?.screening.status as "passed" | "failed"}
							assessedBy={
								applicant?.stages?.screening.assessed_by as unknown as RoleEnumsType[]
							}
						/>
					</CardSubContent>
				</CardContent>
				<CardFooter>
					{!applicant?.stages?.screening.date ? (
						<ApplicantIDUpdateDateFooter
							id={applicant?.id as number}
							date={applicant?.stages?.screening.date as Date}
						/>
					) : applicant?.stages?.screening.status !== "passed" ? (
						<ApplicantIDUpdateStatusFooter id={applicant?.id as number} />
					) : (
						<div className="h-[40px]"></div>
					)}
				</CardFooter>
			</Card>
			<HrPageFooter
				stage="screening"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
			/>
		</>
	);
}
