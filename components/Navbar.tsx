import { HR_HEAD } from "~/constant/constant";
import { validateRequest } from "~/lib/auth";

export default async function Navbar() {
	const { user } = await validateRequest();

	return (
		<nav className="flex h-[74px] items-center justify-end gap-4 px-10 py-5 text-black shadow-md">
			<div className="h-10 w-10 rounded-full bg-slate-400"></div>
			<div>
				<p className="text-sm font-semibold">{user?.name}</p>
				<p className="text-sm">{user?.role === "hr_head" && HR_HEAD}</p>
			</div>
		</nav>
	);
}
