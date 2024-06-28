import LogoutButton from "~/components/LogoutButton";
import Navbar from "~/components/Navbar";
import { Links } from "~/components/SideNav";
import { AdminSubNav } from "~/components/pages/authenticated/admin/AdminSubNav";
import ApplicantSVG from "~/components/ui/applicant-svg";
import DashboardSVG from "~/components/ui/dashboard-svg";
import LogoutSVG from "~/components/ui/logout-svg";
import TypographyH4 from "~/components/ui/typography-h4";
import { validateRequest } from "~/lib/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	// if (user?.role !== "admin") return redirect("/admin/users/manage-users");

	return (
		<div className="flex justify-center">
			<nav className="flex w-[239px] flex-col items-center border-r-2 border-black/30">
				<p className="py-10 text-lg font-bold">HireHub</p>
				<ul className="flex flex-col items-center justify-center gap-8 text-sm font-semibold">
					<Links href="/dashboard" label="Dashboard">
						<DashboardSVG />
					</Links>
					<Links href="/admin/users/manage-users" label="Users">
						<ApplicantSVG />
					</Links>
					<div className="flex w-[96%] justify-start gap-4 rounded-xl px-5 py-3 font-medium hover:bg-[#7F0000] hover:text-white">
						<LogoutSVG />
						<LogoutButton />
					</div>
				</ul>
			</nav>
			<section className="container px-0">
				<Navbar />
				<section className="bg-slate-200/30 px-10 py-10">
					<TypographyH4 text="Users List" />
					<div className="mx-auto">
						<div>
							<div className="flex items-center justify-between py-4">
								<AdminSubNav />
							</div>
							{children}
						</div>
					</div>
				</section>
			</section>
		</div>
	);
}
