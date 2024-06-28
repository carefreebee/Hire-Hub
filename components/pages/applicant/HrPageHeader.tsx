import Link from "next/link";
import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { TypographySmall } from "../../ui/typography-small";

export default async function HrPageHeader({ id }: { id: string }) {
	const { applicant, stages } = await getApplicantData(Number(id));

	const stageLinks = [
		{
			name: "Screening",
			stage: applicant?.stages?.screening,
			path: `/dashboard/applicant/${id}`,
		},
		{
			name: "Initial Interview",
			stage: applicant?.stages?.initial_interview,
			path: `/dashboard/applicant/${id}/stages/initial-interview`,
		},
		{
			name: "Teaching Demo",
			stage: applicant?.stages?.teaching_demo,
			path: `/dashboard/applicant/${id}/stages/teaching-demo`,
		},
		{
			name: "Psychological Exam",
			stage: applicant?.stages?.psychological_exam,
			path: `/dashboard/applicant/${id}/stages/psychological-exam`,
		},
		{
			name: "Panel Interview",
			stage: applicant?.stages?.panel_interview,
			path: `/dashboard/applicant/${id}/stages/panel-interview`,
		},
		{
			name: "Recommendation for Hiring",
			stage: applicant?.stages?.recommendation_for_hiring,
			path: `/dashboard/applicant/${id}/stages/recommendation-for-hiring`,
		},
	];

	return (
		<header>
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-semibold">Department</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.selected_department || applicant?.selected_office}
						</TypographySmall>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-medium">Applied as:</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.positionType === SelectedCategoryTeachingStaff
								? TeachingStaff
								: NonTeachingStaff}
						</TypographySmall>
					</div>
				</div>
			</section>

			<div>
				<ul className="flex justify-between rounded-lg border shadow-md">
					{stageLinks.map(({ name, stage, path }) => (
						<Link
							key={name}
							href={path}
							className={`${stage?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : stage?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
						>
							{stage && name}
						</Link>
					))}
					{/* <Link
						href={`${applicant?.stages?.screening && `/dashboard/applicant/${id}`}`}
						className={`${applicant?.stages?.screening.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.screening.status === "passed" ? "text-black" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.screening && "Screening"}
					</Link>
					<Link
						href={`${applicant?.stages?.initial_interview && `/dashboard/applicant/${id}/stages/initial-interview`}`}
						className={`${applicant?.stages?.initial_interview.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.initial_interview.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.initial_interview && "Initial Interview"}
					</Link>
					<Link
						href={`${applicant?.stages?.teaching_demo && `/dashboard/applicant/${id}/stages/teaching-demo`}`}
						className={`${applicant?.stages?.teaching_demo.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.teaching_demo.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.teaching_demo && "Teaching Demo"}
					</Link>
					<Link
						href={`${applicant?.stages?.psychological_exam && `/dashboard/applicant/${id}/stages/psychological-exam`}`}
						className={`${applicant?.stages?.psychological_exam.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.psychological_exam.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.psychological_exam && "Psychological Exam"}
					</Link>
					<Link
						href={`${applicant?.stages?.panel_interview && `/dashboard/applicant/${id}/stages/panel-interview`}`}
						className={`${applicant?.stages?.panel_interview.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.panel_interview.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.panel_interview && "Panel Interview"}
					</Link>
					<Link
						href={`${applicant?.stages?.recommendation_for_hiring && `/dashboard/applicant/${id}/stages/recommendation-for-hiring`}`}
						className={`${applicant?.stages?.recommendation_for_hiring.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.recommendation_for_hiring.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
					>
						{applicant?.stages?.recommendation_for_hiring &&
							"Recommendation for Hiring"}
					</Link> */}
				</ul>
			</div>
		</header>
	);
}
