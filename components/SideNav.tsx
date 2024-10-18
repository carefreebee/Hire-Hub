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

export default function SideNav({ role }: { role: RoleEnumsType }) {
	return (
		<nav className="flex w-[239px] flex-col items-center bg-gradient-to-t from-[#7F0000]/30 from-10% via-white">
			<p className="flex h-[74px] w-full items-center justify-center bg-[#7F0000] text-xl font-semibold text-white">
				HireHub
			</p>
			<ul className="mt-5 flex w-full flex-col items-center justify-center gap-8 text-sm font-semibold">
				{role === "recruitment_officer" && (
					<Links
						href="/dashboard"
						label="Dashboard"
						activeChildren={<DashboardSVG />}
						notActiveChildren={<WhiteDashboardSvg />}
					/>
				)}
				<Links
					href="/dashboard/applicant"
					label="Applicant"
					activeChildren={<ApplicantSVG />}
					notActiveChildren={<WhiteApplicantSvg />}
				/>
				{role === "requester_staff" && (
					<Links
						href="/dashboard/request"
						label="Request"
						activeChildren={<JobRequestSVG />}
						notActiveChildren={<WhiteJobRequestSvg />}
					/>
				)}

				{role === "recruitment_officer" && (
					<Links
						href="/dashboard/request"
						label="Request"
						activeChildren={<JobRequestSVG />}
						notActiveChildren={<WhiteJobRequestSvg />}
					/>
				)}
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
	const isAdminAtUsers = pathname.startsWith("/admin/users") === href.startsWith("/admin/users");
	const isAdminAtUnits = pathname.startsWith("/admin/units") === href.startsWith("/admin/units");
	const isUserAtApplicant =
		pathname.startsWith("/dashboard/applicant") === href.startsWith("/dashboard/applicant");
	const isUserAtRequest =
		pathname.startsWith("/dashboard/request") === href.startsWith("/dashboard/request");

	const isActive = isAdminAtUsers && isAdminAtUnits && isUserAtApplicant && isUserAtRequest;

	return (
		<Link
			href={href}
			className={`${isActive ? "bg-[#7F0000] text-white" : ""} flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white`}
		>
			{!isActive ? activeChildren : notActiveChildren}
			<p>{label}</p>
		</Link>
	);
}
