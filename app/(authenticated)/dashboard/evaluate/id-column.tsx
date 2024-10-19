"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCurrentRole } from "~/util/zustand";

export default function IDColumn({ id }: { id: number }) {
	const currentRole = useCurrentRole((state) => state.currentRole);

	const CHAIRLINK = `/dashboard/evaluate/${id}/${currentRole}/initial-interview`;
	const FACULTYLINK = `/dashboard/evaluate/${id}/${currentRole}/teaching-demo`;
	const VPLINK = `/dashboard/evaluate/${id}/${currentRole}/panel-interview`;

	const isDeanOrChair = () => {
		return currentRole === "dean" || currentRole === "department_chair" ? true : false;
	};

	const isFaculty = () => {
		return currentRole === "faculty" ? true : false;
	};

	const isVP = () => {
		return currentRole === "vp_acad_affairs" || currentRole === "vp_administration"
			? true
			: false;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="rounded-xl">
				<DropdownMenuItem>
					<Link
						href={
							isDeanOrChair()
								? CHAIRLINK
								: isFaculty()
									? FACULTYLINK
									: isVP()
										? VPLINK
										: "/dashboard/evaluate"
						}
					>
						Evaluate
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
