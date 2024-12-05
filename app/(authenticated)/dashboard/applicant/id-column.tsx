"use client";

import { useState } from "react";
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
import { Spinner } from "~/components/ui/spinner";

export default function IDColumn({ id }: { id: number }) {
	const [loading, setLoading] = useState(false);
	const currentRole = useCurrentRole((state) => state.currentRole);

	const RECRUITMENTOFFICERLINK = `/dashboard/applicant/${id}/stages/recruitment_officer/screening`;
	const EVALUATELINK = `/dashboard/applicant/${id}/stages/recruitment_officer/screening`;

	const handleViewClick = () => {
		setLoading(true);
	};

	return (
		<>
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="flex flex-col items-center space-y-4">
						<Spinner size="lg" className="bg-red-500 dark:bg-red-700" />
						<span className="text-white">Loading...</span>
					</div>
				</div>
			)}
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
									currentRole === "recruitment_officer"
										? RECRUITMENTOFFICERLINK
										: EVALUATELINK
								}
								onClick={handleViewClick}
							>
								View
							</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
