"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RoleEnumsType } from "~/lib/schema";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useCurrentRole } from "~/util/zustand";
import { Bell } from "lucide-react";
import { getCurrentUser } from "~/actions/actions";
import { usePathname } from "next/navigation";

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
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);

	const pathname = usePathname();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getCurrentUser();
			if (user) {
				setCurrentUserId(user.id);
			}
		};

		fetchUser();
	}, []);

	if (currentRole === "") {
		setCurrentRole(role);
	}

	const isBellActive = pathname === `/dashboard/notification/${currentUserId}`;

	return (
		<nav className="flex h-[74px] items-center justify-end gap-3 px-10 py-5 text-black shadow-md">
			{currentUserId && (
				<Link
					href={`/dashboard/notification/${currentUserId}`}
					className={`relative mr-2 ${
						isBellActive ? "bg-gray-300 text-gray-900" : ""
					} hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center rounded-full p-2`}
				>
					<Bell
						className={`h-6 w-6 cursor-pointer ${
							isBellActive ? "text-[#7F0000]" : "text-gray-600"
						}`}
					/>
				</Link>
			)}

			{/* Avatar Section */}
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
				<p className="text-sm font-semibold">{name || "Loading..."}</p>
				<p className="text-sm">{role ? formattedNameAndRole(role, "_") : "Loading..."}</p>
			</div>
		</nav>
	);
}
