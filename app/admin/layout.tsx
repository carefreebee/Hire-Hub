import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import Navbar from "~/components/Navbar";
import { Links } from "~/components/SideNav";
import ApplicantSVG from "~/components/ui/applicant-svg";
import DashboardSVG from "~/components/ui/dashboard-svg";
import LogoutSVG from "~/components/ui/logout-svg";
import UnitSvg from "~/components/ui/unit-svg";
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
			<nav className="flex w-[239px] flex-col items-center border-r-2 border-black/30 bg-gradient-to-t from-[#7F0000]/30 from-10% via-white">
				<p className="flex h-[74px] w-full items-center justify-center bg-[#7F0000] text-xl font-semibold text-white">
					HireHub
				</p>
				<ul className="mt-5 flex w-full flex-col items-center justify-center gap-8 text-sm font-semibold">
					<Links href="/admin/dashboard" label="Dashboard">
						<DashboardSVG />
					</Links>
					<Links href="/admin/users/manage-users" label="Users">
						<ApplicantSVG />
					</Links>
					<Links href="/admin/units/department" label="Units">
						<UnitSvg />
					</Links>
					<div className="flex w-[96%] justify-start gap-4 rounded-xl py-3 pl-10 font-medium hover:bg-[#7F0000] hover:text-white">
						<LogoutSVG />
						<LogoutButton />
					</div>
				</ul>
			</nav>
			<section className="container px-0">
				<Navbar name={user?.name as string} role={user?.role as RoleEnumsType} />
				<section className="bg-slate-200/30 px-10 py-10">{children}</section>
			</section>
		</div>
	);
}
