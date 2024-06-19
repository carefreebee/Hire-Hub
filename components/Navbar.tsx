"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
	const pathname = usePathname();

	if (pathname === "/" || pathname === "/apply-now") return;

	return (
		<nav className="flex items-center justify-between bg-[#7F0000] px-10 py-5 text-white">
			<p className="text-2xl font-semibold">HireHub</p>
			<ul className="flex items-center gap-5 font-semibold">
				<Link href="/dashboard/hr">hr</Link>
				<Link href="/dashboard/evaluator">evaluator</Link>
				<Link href="/dashboard/request">Request</Link>
				<Link href="/dashboard/applicatn">Applicant</Link>
				<LogoutButton />
			</ul>
		</nav>
	);
}
