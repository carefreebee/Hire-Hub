import dynamic from "next/dynamic";
import ApplicantIDAssessedBy from "~/components/pages/authenticated/applicant/screening/ApplicantIDAssessedBy";
import ApplicantIDUpdateDateFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateDateFooter";
import ApplicantIDUpdateStatusFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateStatusFooter";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/screening/SelectPassedOrFailed";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getApplicantFormByID } from "~/controller/ApplicantController";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/screening/ApplicantIDDisplayDate"),
	{
		ssr: false,
	}
);

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const applicant = await getApplicantFormByID(Number(params.id));

	return (
		<section className="my-14 h-auto border-2">
			<header className="flex items-center border-b-2">
				<div className="flex-1">
					<TypographySmall className="px-5">{applicant?.status}</TypographySmall>
				</div>
			</header>
			<div className="mt-5 flex h-36">
				<div className="flex flex-1 flex-col">
					<div className="flex items-center gap-24">
						<TypographySmall size={"md"}>{applicant?.status}</TypographySmall>
						{applicant?.stages?.screening.status === "in-progress" ? (
							<SelectPassedOrFailed />
						) : (
							<Button variant={"outline"} disabled className="text-[#039E38]">
								{applicant?.stages?.screening.status}
							</Button>
						)}
					</div>
					<ApplicantIDDisplayDateNoSSR
						date={applicant?.stages?.screening?.date as Date}
					/>
				</div>
				<div className="mr-10 flex flex-1 flex-col">
					<TypographySmall size={"md"} className="px-0">
						Assessed by:
					</TypographySmall>
					<ApplicantIDAssessedBy
						status={applicant?.stages?.screening.status as "passed" | "failed"}
						assessedBy={applicant?.stages?.screening.assessed_by as string}
					/>
				</div>
			</div>
			<footer className="flex items-center justify-between border-t-2">
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
			</footer>
		</section>
	);
}
