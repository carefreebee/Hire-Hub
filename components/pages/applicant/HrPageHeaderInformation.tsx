"use client";

import Link from "next/link";
import { ApplicantSelect } from "~/lib/schema";
import { useCurrentRole } from "~/util/zustand";

type HrPageHeaderInformationProps = {
	id: string;
	role: string;
	applicant: ApplicantSelect;
};

export default function HrPageHeaderInformation({
	id,
	role,
	applicant,
}: HrPageHeaderInformationProps) {
	const currentRole = useCurrentRole((state) => state.currentRole);

	return (
		<>
			{role === "hr_head" ? (
				<Link
					href={`/dashboard/applicant/${id}/stages/hr_head/screening`}
					className={`${applicant?.stages?.screening?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.screening?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
				>
					Screening
				</Link>
			) : (
				<Link
					href={`/dashboard/applicant/${id}/stages/${currentRole}/evaluate`}
					className="px-5 py-2 text-sm font-medium"
				>
					Evaluate
				</Link>
			)}
			<Link
				href={`/dashboard/applicant/${id}/stages/${currentRole}/initial-interview`}
				className={`${applicant?.stages?.initial_interview?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.initial_interview?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
			>
				Initial Interview
			</Link>
			<Link
				href={`/dashboard/applicant/${id}/stages/${currentRole}/teaching-demo`}
				className={`${applicant?.stages?.teaching_demo?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.teaching_demo?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
			>
				Teaching Demo
			</Link>
			<Link
				href={`/dashboard/applicant/${id}/stages/${currentRole}/psychological-exam`}
				className={`${applicant?.stages?.psychological_exam?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.psychological_exam?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
			>
				Psychological Exam
			</Link>
			<Link
				href={`/dashboard/applicant/${id}/stages/${currentRole}/panel-interview`}
				className={`${applicant?.stages?.panel_interview?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.panel_interview?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
			>
				Panel Interview
			</Link>
			<Link
				href={`/dashboard/applicant/${id}/stages/${currentRole}/recommendation-for-hiring`}
				className={`${applicant?.stages?.recommendation_for_hiring?.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : applicant?.stages?.recommendation_for_hiring?.status === "passed" ? "text-green-500" : "text-slate-400"} px-5 py-2 text-sm font-medium`}
			>
				Recommendation for Hiring
			</Link>
		</>
	);
}
