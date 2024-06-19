import Link from "next/link";
import { validateRequest } from "~/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
	const { user } = await validateRequest();

	return (
		<nav className="flex items-center justify-between bg-[#7F0000] px-10 py-5 text-white">
			<p className="text-2xl font-semibold">HireHub</p>
			<ul className="flex items-center gap-5 font-semibold">
				<Link href="/dashboard/hr">HR</Link>
				<Link href="/dashboard/evaluator">Evaluator</Link>
				<Link href="/dashboard/request">Request</Link>
				<Link href="/dashboard/applicatn">Applicant</Link>
				{user && <LogoutButton />}
			</ul>
		</nav>
	);
}
