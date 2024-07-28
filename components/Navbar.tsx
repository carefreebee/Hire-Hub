"use client";

import Image from "next/image";
import { useState } from "react";
import { RoleEnumsType } from "~/lib/schema";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useCurrentRole } from "~/util/zustand";

type NavbarProps = {
	avatarUrl: string | null | undefined;
	name: string;
	role: RoleEnumsType;
	department?: string;
	office?: string;
};

export default function Navbar({ avatarUrl, name, role, department, office }: NavbarProps) {
	const { currentRole, setCurrentRole } = useCurrentRole((state) => ({
		currentRole: state.currentRole,
		setCurrentRole: state.setCurrentRole,
	}));

	const [imageError, setImageError] = useState(false);

	if (currentRole === "") {
		setCurrentRole(role);
	}

	return (
		<nav className="flex h-[74px] items-center justify-end gap-3 px-10 py-5 text-black shadow-md">
			<div className="relative h-10 w-10">
				{avatarUrl && !imageError ? (
					<Image
						src={avatarUrl as string}
						alt="User Profile"
						fill
						className="rounded-full"
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="h-10 w-10 rounded-full bg-slate-400"></div>
				)}
			</div>
			<div>
				<p className="text-sm font-semibold">{formattedNameAndRole(name, "_")}</p>
				<p className="text-sm">{formattedNameAndRole(role, "_")}</p>
			</div>
		</nav>
	);
}
