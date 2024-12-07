"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";
import { useCurrentRole } from "~/util/zustand";

export default function IDColumn({ id }: { id: number }) {
	const [loading, setLoading] = useState(false);
	const currentRole = useCurrentRole((state) => state.currentRole);

	const CHAIRLINK = `/dashboard/evaluate/${id}/${currentRole}/screening`;
	const FACULTYLINK = `/dashboard/evaluate/${id}/${currentRole}/teaching-demo`;
	const GUIDANCELINK = `/dashboard/evaluate/${id}/${currentRole}/psychological-exam`;
	const VPLINK = `/dashboard/evaluate/${id}/${currentRole}/panel-interview`;
	const PLINK = `/dashboard/evaluate/${id}/${currentRole}/recommendation-for-hiring`;

	const isDeanOrChair = () => currentRole === "dean" || currentRole === "department_chair";

	const isGuidance = () =>
		currentRole === "guidance_center_staff" || currentRole === "recruitment_officer";

	const isFaculty = () => currentRole === "faculty";

	const isVP = () => currentRole === "vp_acad_affairs" || currentRole === "vp_administration";

	const isP = () => currentRole === "univ_president";

	const handleEvaluateClick = () => {
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
								isDeanOrChair()
									? CHAIRLINK
									: isGuidance()
										? GUIDANCELINK
										: isFaculty()
											? FACULTYLINK
											: isVP()
												? VPLINK
												: isP()
													? PLINK
													: "/dashboard/evaluate"
							}
							onClick={handleEvaluateClick}
						>
							Evaluate
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
