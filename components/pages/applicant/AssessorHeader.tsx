import Link from "next/link";
import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { TypographySmall } from "../../ui/typography-small";

export default async function AssessorHeader({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant } = await getApplicantData(Number(id));

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
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/evaluate`}
						className="px-3 py-2 text-sm font-medium"
					>
						Evaluate
					</Link>
					{user?.role === "recruitment_officer" && (
						<Link
							href={`/dashboard/applicant/${id}/stages/recruitment_officer/screening`}
							className={`${applicant?.stages?.screening?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.screening?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
						>
							Screening
						</Link>
					)}
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/initial-interview`}
						className={`${applicant?.stages?.initial_interview?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.initial_interview?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
					>
						Initial Interview
					</Link>
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/teaching-demo`}
						className={`${applicant?.stages?.teaching_demo?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.teaching_demo?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
					>
						Teaching Demo
					</Link>
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/psychological-exam`}
						className={`${applicant?.stages?.psychological_exam?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.psychological_exam?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
					>
						Psychological Exam
					</Link>
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/panel-interview`}
						className={`${applicant?.stages?.panel_interview?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.panel_interview?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
					>
						Panel Interview
					</Link>
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/recommendation-for-hiring`}
						className={`${applicant?.stages?.recommendation_for_hiring?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.recommendation_for_hiring?.status === "passed" ? "text-green-500" : "text-slate-400"} px-3 py-2 text-sm font-medium`}
					>
						Recommendation for Hiring
					</Link>
				</ul>
			</div>
		</header>
	);
}
