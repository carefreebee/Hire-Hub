import LogoutButton from "~/components/LogoutButton";
import Navbar from "~/components/Navbar";
import { Links } from "~/components/SideNav";
import ApplicantSVG from "~/components/ui/applicant-svg";
import DashboardSVG from "~/components/ui/dashboard-svg";
import LogoutSVG from "~/components/ui/logout-svg";
import UnitSvg from "~/components/ui/unit-svg";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	// if (user?.role !== "admin") return redirect("/admin/users/manage-users");

	return (
		<div className="flex justify-center">
			<nav className="flex w-[239px] flex-col items-center border-r-2 border-black/30">
				<p className="py-10 text-lg font-bold">HireHub</p>
				<ul className="flex flex-col items-center justify-center gap-8 text-sm font-semibold">
					<Links href="/admin" label="Dashboard">
						<DashboardSVG />
					</Links>
					<Links href="/admin/users/manage-users" label="Users">
						<ApplicantSVG />
					</Links>
					<Links href="/admin/units/department" label="Units">
						<UnitSvg />
					</Links>
					<div className="flex w-[96%] justify-start gap-4 rounded-xl px-5 py-3 font-medium hover:bg-[#7F0000] hover:text-white">
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
