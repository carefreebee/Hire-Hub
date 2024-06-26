import { redirect } from "next/navigation";
import Navbar from "~/components/Navbar";
import SideNav from "~/components/SideNav";
import { validateRequest } from "~/lib/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return redirect("/");
	else if (user?.role === "user") return redirect("/user");
	else if (user?.role === "admin") return redirect("/admin/users/manage-users");
	else if (user?.role !== "hr_head") return redirect("/dashboard/applicant");

	return (
		<div className="flex justify-center">
			<SideNav />
			<section className="container px-0">
				<Navbar />
				{children}
			</section>
		</div>
	);
}