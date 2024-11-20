"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleEnumsType } from "~/lib/schema";
import LogoutButton from "./LogoutButton";
import ApplicantSVG from "./ui/applicant-svg";
import DashboardSVG from "./ui/dashboard-svg";
import JobRequestSVG from "./ui/job-request-svg";
import LogoutSVG from "./ui/logout-svg";
import WhiteApplicantSvg from "./ui/white-applicant-svg";
import WhiteDashboardSvg from "./ui/white-dashboard-svg";
import WhiteJobRequestSvg from "./ui/white-job-request-svg";
import ScheduleSVG from "./ui/schedule";
import ScheduleSVGWhite from "./ui/schedule-white";
import EvaluateSVG from "./ui/evalute-icon";
import EvaluateSVGWhite from "./ui/evalute-icon-white";
import ApprovalsSVGWhite from "./ui/approvals-icon-white";
import ApprovalsSVG from "./ui/approvals-icon";

export default function SideNav({ role }: { role: RoleEnumsType }) {
	return (
		<nav className="flex w-[239px] flex-col items-center bg-gradient-to-t from-[#7F0000]/30 from-10% via-white">
			<p className="flex h-[74px] w-full items-center justify-center bg-[#7F0000] text-xl font-semibold text-white">
				HireHub
			</p>
			<ul className="mt-5 flex w-full flex-col items-center justify-center gap-8 text-sm font-semibold">
				{/* Recruitment Officer Specific */}
				{role === "recruitment_officer" && (
					<Links
						href="/dashboard"
						label="Dashboard"
						activeChildren={<DashboardSVG />}
						notActiveChildren={<WhiteDashboardSvg />}
					/>
				)}

				{/* Common Applicant Tab */}
				<Links
					href="/dashboard/applicant"
					label="Applicant"
					activeChildren={<ApplicantSVG />}
					notActiveChildren={<WhiteApplicantSvg />}
				/>

				{/* Role-Specific Links */}
				{["recruitment_officer", "requester_staff", "dean"].includes(role) && (
					<Links
						href="/dashboard/request"
						label="Request"
						activeChildren={<JobRequestSVG />}
						notActiveChildren={<WhiteJobRequestSvg />}
					/>
				)}

				{[
					"hr_head",
					"vp_administration",
					"vp_acad_affairs",
					"dean",
					"department_chair",
				].includes(role) && (
					<Links
						href="/dashboard/evaluate"
						label="Evaluate"
						activeChildren={<EvaluateSVG />}
						notActiveChildren={<EvaluateSVGWhite />}
					/>
				)}

				{role === "hr_head" && (
					<Links
						href="/dashboard/approvals"
						label="Approvals"
						activeChildren={<ApprovalsSVG />}
						notActiveChildren={<ApprovalsSVGWhite />}
					/>
				)}

				{/* Schedule Tab for Specific Roles */}
				{["dean", "recruitment_officer", "hr_head"].includes(role) && (
					<Links
						href="/dashboard/schedule"
						label="Schedule"
						activeChildren={<ScheduleSVG />}
						notActiveChildren={<ScheduleSVGWhite />}
					/>
				)}

				{/* Logout Button */}
				<div className="flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white">
					<LogoutSVG />
					<LogoutButton />
				</div>
			</ul>
		</nav>
	);
}

type LinksProps = {
	href: string;
	activeChildren: React.ReactNode;
	notActiveChildren: React.ReactNode;
	label?: string;
};

export function Links({ href, activeChildren, notActiveChildren, label }: LinksProps) {
	const pathname = usePathname();

	// Determine if the current link is active
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={`${
				isActive ? "bg-[#7F0000] text-white" : ""
			} flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white`}
		>
			{isActive ? activeChildren : notActiveChildren}
			<p>{label}</p>
		</Link>
	);
}
