import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import Navbar from "~/components/Navbar";
import { Links } from "~/components/SideNav";
import ApplicantSVG from "~/components/ui/applicant-svg";
import DashboardSVG from "~/components/ui/dashboard-svg";
import JobRequestSVG from "~/components/ui/job-request-svg";
import LogoutSVG from "~/components/ui/logout-svg";
import WhiteApplicantSvg from "~/components/ui/white-applicant-svg";
import WhiteDashboardSvg from "~/components/ui/white-dashboard-svg";
import WhiteJobRequestSvg from "~/components/ui/white-job-request-svg";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import { authorizedRoles } from "~/util/filter-roles";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return redirect("/login");
	else if (authorizedRoles.includes(user?.role as RoleEnumsType)) {
		return redirect("/dashboard/applicant");
	}

	return (
		<div className="flex justify-center">
			<nav className="flex w-[239px] flex-col items-center bg-gradient-to-t from-[#7F0000]/30 from-10% via-white">
				<p className="flex h-[74px] w-full items-center justify-center bg-[#7F0000] text-xl font-semibold text-white">
					HireHub
				</p>
				<ul className="mt-5 flex w-full flex-col items-center justify-center gap-8 text-sm font-semibold">
					<Links
						href="/admin/dashboard"
						label="Dashboard"
						activeChildren={<WhiteDashboardSvg />}
						notActiveChildren={<DashboardSVG />}
					/>
					<Links
						href="/admin/users/manage-users"
						label="Users"
						activeChildren={<WhiteApplicantSvg />}
						notActiveChildren={<ApplicantSVG />}
					/>
					<Links
						href="/admin/units/department"
						label="Units"
						activeChildren={<WhiteJobRequestSvg />}
						notActiveChildren={<JobRequestSVG />}
					/>
					<div className="flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white">
						<LogoutSVG />
						<LogoutButton />
					</div>
				</ul>
			</nav>
			<section className="container px-0">
				<Navbar
					avatarUrl={user?.avatarUrl}
					name={user?.name as string}
					role={user?.role as RoleEnumsType}
				/>
				<section className="bg-slate-200/30">{children}</section>
			</section>
		</div>
	);
}
