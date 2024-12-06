"use client";

import { useState } from "react";
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
import { Progress } from "~/components/ui/progress";

export default function SideNav({ role }: { role: RoleEnumsType }) {
	const [loading, setLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	const handleLinkClick = () => {
		setLoading(true);
		setProgress(13);
		setTimeout(() => {
			setProgress(66);
		}, 500);
		setTimeout(() => {
			setProgress(100);
			setLoading(false);
		}, 1500);
	};

	return (
		<nav className="flex w-[239px] flex-col items-center bg-gradient-to-t from-[#7F0000]/30 from-10% via-white">
			<p className="flex h-[74px] w-full items-center justify-center bg-[#7F0000] text-xl font-semibold text-white">
				HireHub
			</p>

			{loading && (
				<div className="w-full bg-[#7F0000]">
					<Progress value={progress} className="h-1" />
				</div>
			)}

			<ul className="mt-5 flex w-full flex-col items-center justify-center gap-8 text-sm font-semibold">
				{/* Recruitment Officer Specific */}
				{role === "recruitment_officer" && (
					<Links
						href="/dashboard"
						label="Dashboard"
						activeChildren={<WhiteDashboardSvg />}
						notActiveChildren={<DashboardSVG />}
						onClick={handleLinkClick} // Add onClick handler
					/>
				)}

				{/* Common Applicant Tab */}
				<Links
					href="/dashboard/applicant"
					label="Applicant"
					activeChildren={<WhiteApplicantSvg />}
					notActiveChildren={<ApplicantSVG />}
					onClick={handleLinkClick} // Add onClick handler
				/>

				{/* Role-Specific Links */}
				{["recruitment_officer", "requester_staff", "dean"].includes(role) && (
					<Links
						href="/dashboard/request"
						label="Request"
						activeChildren={<WhiteJobRequestSvg />}
						notActiveChildren={<JobRequestSVG />}
						onClick={handleLinkClick} // Add onClick handler
					/>
				)}

				{[
					"hr_head",
					"vp_administration",
					"vp_acad_affairs",
					"dean",
					"department_chair",
					"faculty",
					"guidance_center_staff",
					"univ_president",
				].includes(role) && (
					<Links
						href="/dashboard/evaluate"
						label="Evaluate"
						activeChildren={<EvaluateSVGWhite />}
						notActiveChildren={<EvaluateSVG />}
						onClick={handleLinkClick} // Add onClick handler
					/>
				)}

				{role === "hr_head" && (
					<Links
						href="/dashboard/approvals"
						label="Approvals"
						activeChildren={<ApprovalsSVGWhite />}
						notActiveChildren={<ApprovalsSVG />}
						onClick={handleLinkClick} // Add onClick handler
					/>
				)}

				{/* Schedule Tab for Specific Roles */}
				{["dean", "recruitment_officer", "hr_head", "department_chair", "guidance_center_staff", "vp_administration", "vp_acad_affairs", "univ_president"].includes(role) && (
					<Links
						href="/dashboard/schedule"
						label="Schedule"
						activeChildren={<ScheduleSVGWhite />}
						notActiveChildren={<ScheduleSVG />}
						onClick={handleLinkClick} // Add onClick handler
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
	onClick?: () => void;
};

export function Links({ href, activeChildren, notActiveChildren, label, onClick }: LinksProps) {
	const pathname = usePathname();

	// Determine if the current link is active
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			onClick={onClick} 
			className={`${
				isActive ? "bg-[#7F0000] text-white" : ""
			} flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white`}
		>
			{isActive ? activeChildren : notActiveChildren}
			<p>{label}</p>
		</Link>
	);
}
