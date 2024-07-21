"use client";

import Link from "next/link";
import { TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/date-time";
import { RatingFormWithUserData } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useFilteredEvaluate } from "~/util/zustand";

type FilteredDisplayProps = {
	mergedData: RatingFormWithUserData[];
	tableRowLength: number;
};

export default function FilteredDisplay({ mergedData, tableRowLength }: FilteredDisplayProps) {
	const filteredEvaluate = useFilteredEvaluate((state) => state.filteredEvaluate);

	const filteredMergeData = mergedData.filter(
		(data) => !filteredEvaluate || data.recruitment_stage === filteredEvaluate
	);

	if (filteredMergeData.length === 0) {
		return (
			<TableRow className="bg-muted/50 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center">
					No data to display.
				</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{filteredMergeData.map((data) => (
				<TableRow key={data.rating_id} className="bg-muted/50 text-center">
					<TableCell className="h-12">{data.recruitment_stage}</TableCell>
					<TableCell className="h-12">{formattedNameAndRole(data.name, "_")}</TableCell>
					<TableCell className="h-12">{formattedNameAndRole(data.role, "_")}</TableCell>
					<TableCell className="h-12">{formatDate(data.created_at as Date)}</TableCell>
					<TableCell className="h-12">
						<Link href={data.rate} target="blank" className="text-[#0F91D2]">
							View
						</Link>
					</TableCell>
					<td></td>
				</TableRow>
			))}
		</>
	);
}
