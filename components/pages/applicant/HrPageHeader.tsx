import { DEPARTMENT } from "~/constants/constants";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { TypographySmall } from "../../ui/typography-small";

export default async function HrPageHeader({ id }: { id: string }) {
	const applicant = await getApplicantFormByID(Number(id));

	const {
		screening,
		teaching_demo,
		panel_interview,
		initial_interview,
		psychological_exam,
		recommendation_for_hiring,
	} = applicant?.stages || {};

	const stages = [
		{ name: "Screening", status: screening?.status },
		{ name: "Initial Interview", status: initial_interview?.status },
		{ name: "Teaching Demo", status: teaching_demo?.status },
		{ name: "Psychological Exam", status: psychological_exam?.status },
		{ name: "Panel Interview", status: panel_interview?.status },
		{ name: "Recommendation", status: recommendation_for_hiring?.status },
	];

	return (
		<header>
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-semibold">Department</TypographySmall>
					</div>
					<div>
						<TypographySmall size={"sm"} variant={"outline"} className="font-medium">
							{DEPARTMENT}
						</TypographySmall>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-medium">Applied as:</TypographySmall>
					</div>
					<div>
						<TypographySmall size={"sm"} variant={"outline"} className="font-medium">
							Teaching Staff
						</TypographySmall>
					</div>
				</div>
			</section>

			<div>
				<ul className="flex justify-between rounded-lg border shadow-md">
					{stages.map((item, index) => (
						<li
							key={index}
							className={`${item.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : "bg-transparent"} px-5 py-2 text-sm font-medium`}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
