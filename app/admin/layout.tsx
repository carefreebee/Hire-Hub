import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import Navbar from "~/components/Navbar";
import { Links } from "~/components/SideNav";
import ApplicantSVG from "~/components/ui/applicant-svg";
import DashboardSVG from "~/components/ui/dashboard-svg";
import LogoutSVG from "~/components/ui/logout-svg";
import { validateRequest } from "~/lib/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (user?.role !== "admin") return redirect("/admin/users/manage-users");

	return (
		<div className="flex justify-center">
			<nav className="flex w-[239px] flex-col items-center border-r-2 border-black/30">
				<p className="py-10 text-lg font-bold">HireHub</p>
				<ul className="flex flex-col items-center justify-center gap-8 text-sm font-semibold">
					<Links href="/dashboard" label="Dashboard">
						<DashboardSVG />
					</Links>
					<Links href="/admin/users" label="Users">
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
				{children}
			</section>
		</div>
	);
}
