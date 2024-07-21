"use client";

import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useFilteredEvaluate } from "~/util/zustand";

export default function FilterEvaluate({ name }: { name: string }) {
	const setFilteredEvaluate = useFilteredEvaluate((state) => state.setFilteredEvaluate);

	function handleFilterEvaluate() {
		setFilteredEvaluate(name === "All" ? "" : name);
	}

	return (
		<DropdownMenuItem>
			<Button variant={"ghost"} onClick={handleFilterEvaluate} className="h-auto w-auto p-0">
				{name}
			</Button>
		</DropdownMenuItem>
	);
}
