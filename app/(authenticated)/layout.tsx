import { redirect } from "next/navigation";
import Navbar from "~/components/Navbar";
import SideNav from "~/components/SideNav";
import { validateRequest } from "~/lib/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return redirect("/");

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
