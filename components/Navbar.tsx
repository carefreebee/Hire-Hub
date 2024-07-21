"use client";

import { RoleEnumsType } from "~/lib/schema";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useCurrentRole } from "~/util/zustand";

type NavbarProps = {
	name: string;
	role: RoleEnumsType;
	department?: string;
	office?: string;
};

export default function Navbar({ name, role, department, office }: NavbarProps) {
	const { currentRole, setCurrentRole } = useCurrentRole((state) => ({
		currentRole: state.currentRole,
		setCurrentRole: state.setCurrentRole,
	}));

	if (currentRole === "") {
		setCurrentRole(role);
	}

	return (
		<nav className="flex h-[74px] items-center justify-end gap-4 px-10 py-5 text-black shadow-md">
			<div className="h-10 w-10 rounded-full bg-slate-400"></div>
			<div>
				<p className="text-sm font-semibold">{formattedNameAndRole(name, "_")}</p>
				<p className="text-sm">{formattedNameAndRole(role, "_")}</p>
				<p className="text-sm">{department && formattedNameAndRole(department, "_")}</p>
				<p className="text-sm">{office && formattedNameAndRole(office, "_")}</p>
			</div>
		</nav>
	);
}
