"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/date-time";
import { RatingFormWithUserData } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { useFilteredEvaluate } from "~/util/zustand";
import InitialInterviewViewModal from "./modals/InitialViewModal";
import PanelInterviewViewModal from "./modals/PanelInterviewViewModal";
import TeachingDemoViewModal from "./modals/TeachDemoViewModal";

type FilteredDisplayProps = {
	rating: RatingFormWithUserData[];
	tableRowLength: number;
};

export default function FilteredDisplay({ rating, tableRowLength }: FilteredDisplayProps) {
	const filteredEvaluate = useFilteredEvaluate((state) => state.filteredEvaluate);
	const [selectedData, setSelectedData] = useState<RatingFormWithUserData | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredMergeData = rating.filter(
		(data) => !filteredEvaluate || data.recruitment_stage === filteredEvaluate
	);

	const handleViewClick = (data: RatingFormWithUserData) => {
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

			{selectedData?.recruitment_stage === "Initial Interview" && (
				<InitialInterviewViewModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					data={selectedData}
				/>
			)}

			{selectedData?.recruitment_stage === "Teaching Demo" && (
				<TeachingDemoViewModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					data={selectedData}
				/>
			)}
			{selectedData?.recruitment_stage === "Panel Interview" && (
				<PanelInterviewViewModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					data={selectedData}
				/>
			)}
		</>
	);
}
