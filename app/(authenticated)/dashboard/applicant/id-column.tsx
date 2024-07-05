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

	const HRHEADLINK = `/dashboard/applicant/${id}/stages/hr_head/screening`;
	const EVALUATELINK = `/dashboard/applicant/${id}/stages/${currentRole}/evaluate`;

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
					<Link href={currentRole === "hr_head" ? HRHEADLINK : EVALUATELINK}>View</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
