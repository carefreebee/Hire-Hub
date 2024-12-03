"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/date-time";
import { RatingFormWithUserData } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useFilteredEvaluate } from "~/util/zustand";
import InitialInterviewViewModal from "./modals/InitialViewModal";

type FilteredDisplayProps = {
	rating: RatingFormWithUserData[];
	tableRowLength: number;
};

export default function FilteredDisplay({ rating, tableRowLength }: FilteredDisplayProps) {
	const filteredEvaluate = useFilteredEvaluate((state) => state.filteredEvaluate);
	const [selectedData, setSelectedData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredMergeData = rating.filter(
		(data) => !filteredEvaluate || data.recruitment_stage === filteredEvaluate
	);

	const handleViewClick = (data: any) => {
		setSelectedData(data);
		setIsModalOpen(true);
	};

	if (filteredMergeData.length === 0) {
		return (
			<TableRow className="bg-muted/50 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center">
					No data to display.
				</TableCell>
				<td></td>
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
						<Button onClick={() => handleViewClick(data)} className="text-[#0F91D2]">
							View
						</Button>
					</TableCell>
					<td></td>
				</TableRow>
			))}

			{selectedData && (
				<InitialInterviewViewModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					data={selectedData}
				/>
			)}
		</>
	);
}
