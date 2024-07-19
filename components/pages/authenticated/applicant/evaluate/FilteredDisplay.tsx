"use client";

import Link from "next/link";
import { TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/date-time";
import { formattedName } from "~/util/formatted-name";
import { useFilteredEvaluate } from "~/util/zustand";

type FilteredDisplayProps = {
	recruitment_stage: string;
	name: string;
	role: string;
	created_at: Date;
	rate: string;
};

export default function FilteredDisplay({
	recruitment_stage,
	name,
	role,
	created_at,
	rate,
}: FilteredDisplayProps) {
	const filteredEvaluate = useFilteredEvaluate((state) => state.filteredEvaluate);

	return (
		<TableRow className="bg-muted/50 text-center">
			<TableCell className="h-12">{recruitment_stage}</TableCell>
			<TableCell className="h-12">{formattedName(name)}</TableCell>
			<TableCell className="h-12">{formattedName(role)}</TableCell>
			<TableCell className="h-12">{formatDate(created_at as Date)}</TableCell>
			<TableCell className="h-12">
				<Link href={rate} target="blank" className="text-[#0F91D2]">
					View
				</Link>
			</TableCell>
			<td></td>
		</TableRow>
	);
}
