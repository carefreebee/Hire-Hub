import dynamic from "next/dynamic";
import ApplicantIDAssessedBy from "~/components/pages/authenticated/applicant/initial-interview/ApplicantIDAssessedBy";
import ApplicantIDUpdateDateFooter from "~/components/pages/authenticated/applicant/initial-interview/ApplicantIDUpdateDateFooter";
import SelectPassedOrFailed from "~/components/pages/authenticated/applicant/initial-interview/SelectPassedOrFailed";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getApplicantFormByID } from "~/controller/ApplicantController";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() =>
		import(
			"~/components/pages/authenticated/applicant/initial-interview/ApplicantIDDisplayDate"
		),
	{
		ssr: false,
	}
);

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const applicant = await getApplicantFormByID(Number(params.id));
	console.log(applicant);

	return (
		<section className="my-14 h-auto border-2">
			<header className="flex items-center border-b-2">
				<div className="flex-1">
					<TypographySmall className="px-5">
						{applicant?.stages?.initial_interview && "Initial Interview"}
					</TypographySmall>
				</div>
			</header>
			<div className="mt-5 flex h-36">
				<div className="flex flex-1 flex-col">
					<div className="flex items-center gap-24">
						<TypographySmall size={"md"}>
							{applicant?.stages?.initial_interview && "Initial Interview"}
						</TypographySmall>
						{applicant?.stages?.initial_interview.status === "in-progress" ? (
							<SelectPassedOrFailed />
						) : (
							<Button variant={"outline"} disabled className="text-[#039E38]">
								{applicant?.stages?.initial_interview.status}
							</Button>
						)}
					</div>
					<ApplicantIDDisplayDateNoSSR
						date={applicant?.stages?.initial_interview?.date as Date}
					/>
				</div>
				<div className="mr-10 flex flex-1 flex-col">
					<TypographySmall size={"md"} className="px-0">
						Assessed by:
					</TypographySmall>
					<ApplicantIDAssessedBy
						status={applicant?.stages?.initial_interview.status as "passed" | "failed"}
						assessedBy={applicant?.stages?.initial_interview.assessed_by as string}
					/>
				</div>
			</div>
			<footer className="flex items-center border-t-2">
				<ApplicantIDUpdateDateFooter
					id={applicant?.id as number}
					date={applicant?.stages?.initial_interview.date as Date}
				/>
			</footer>
		</section>
	);
}
