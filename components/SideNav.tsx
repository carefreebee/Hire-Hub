"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinksProps } from "~/types/types";
import LogoutButton from "./LogoutButton";
import ApplicantSVG from "./ui/applicant-svg";
import DashboardSVG from "./ui/dashboard-svg";
import JobRequestSVG from "./ui/job-request-svg";
import LogoutSVG from "./ui/logout-svg";
import { RoleEnumsType } from "~/lib/schema";

export default function SideNav({ role }: { role: RoleEnumsType }) {
	return (
		<nav className="flex w-[239px] flex-col items-center border-r-2 border-black/30">
			<p className="py-10 text-lg font-bold">HireHub</p>
			<ul className="flex flex-col items-center justify-center gap-8 text-sm font-semibold">
				{role === "recruitment_officer" && (
					<Links href="/dashboard" label="Dashboard">
						<DashboardSVG />
					</Links>
				)}
				<Links href="/dashboard/applicant" label="Applicant">
					<ApplicantSVG />
				</Links>
				{role === "requester_staff" && <Links href="/dashboard/request" label="Request">
					<JobRequestSVG />
				</Links>}
				<div className="flex w-[96%] justify-start gap-4 rounded-xl px-5 py-3 font-medium hover:bg-[#7F0000] hover:text-white">
					<LogoutSVG />
					<LogoutButton />
				</div>
			</ul>
		</nav>
	);
}

export function Links({ href, children, label }: LinksProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={`${pathname === href ? "bg-[#7F0000] text-white" : ""} flex w-[96%] justify-start gap-4 rounded-xl px-5 py-3 font-medium hover:bg-[#7F0000] hover:text-white`}
		>
			{children}
			<p>{label}</p>
		</Link>
	);
}
