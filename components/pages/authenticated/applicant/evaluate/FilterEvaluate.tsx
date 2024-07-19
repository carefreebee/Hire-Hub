"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useFilteredEvaluate } from "~/util/zustand";

const stages = ["Initial Interview", "Teaching Demo", "Psychological Exam", "Panel Interview"];

export default function FilterEvaluate() {
	const { filteredEvaluate, setFilteredEvaluate } = useFilteredEvaluate((state) => ({
		filteredEvaluate: state.filteredEvaluate,
		setFilteredEvaluate: state.setFilteredEvaluate,
	}));

	// const setFilteredEvaluate = useFilteredEvaluate((state) => state.setFilteredEvaluate);

	function handleFilterEvaluate(stage: string) {
		setFilteredEvaluate(stage);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="rounded-xl">
				{stages.map((stage) => (
					<DropdownMenuItem key={stage}>
						<Button
							variant={"ghost"}
							onClick={() => handleFilterEvaluate(stage)}
							className="h-auto w-full p-0"
						>
							{stage}
						</Button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
