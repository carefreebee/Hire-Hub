import { redirect } from "next/navigation";
import Navbar from "~/components/Navbar";
import { validateRequest } from "~/lib/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return redirect("/");

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
