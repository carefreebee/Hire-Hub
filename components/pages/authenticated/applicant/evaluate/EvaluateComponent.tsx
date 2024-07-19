"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { formatDate } from "~/lib/date-time";
import { RatingFormWithUserData } from "~/types/types";
import { formattedName } from "~/util/formatted-name";
import { useFilteredEvaluate } from "~/util/zustand";

type EvaluateComponentProps = {
	mergedData: RatingFormWithUserData[];
};

const tableRow = [
	{ name: "Recruitment Stage" },
	{ name: "Evaluator Name" },
	{ name: "Role" },
	{ name: "Evaluate Date" },
	{ name: "Rating Form" },
];

const stage = [
	{ name: "All" },
	{ name: "Initial Interview" },
	{ name: "Teaching Demo" },
	{ name: "Psychological Exam" },
	{ name: "Panel Interview" },
];

export default function EvaluateComponent({ mergedData }: EvaluateComponentProps) {
	const { filteredEvaluate, setFilteredEvaluate } = useFilteredEvaluate((state) => ({
		filteredEvaluate: state.filteredEvaluate,
		setFilteredEvaluate: state.setFilteredEvaluate,
	}));

	function handleFilterEvaluate(stageName: string) {
		setFilteredEvaluate(stageName === "All" ? "" : stageName);
	}

	const filteredMergeData = mergedData.filter(
		(data) => !filteredEvaluate || data.recruitment_stage === filteredEvaluate
	);

	return (
		<Table>
			<TableHeader className="rounded-md border-2 border-b-2">
				<TableRow>
					{tableRow.map((table) => (
						<TableHead key={table.name} className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								{table.name}
							</Button>
						</TableHead>
					))}
					<TableHead className="h-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="center" className="rounded-xl">
								{stage.map((stage) => (
									<DropdownMenuItem key={stage.name}>
										<Button
											variant={"ghost"}
											onClick={() => handleFilterEvaluate(stage.name)}
											className="h-auto w-auto p-0"
										>
											{stage.name}
										</Button>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="border-b-0">
					<TableCell className="h-5"></TableCell>
				</TableRow>
				{filteredMergeData.length === 0 ? (
					<TableRow className="bg-muted/50 text-center">
						<TableCell colSpan={tableRow.length} className="h-12 text-center">
							No data to display.
						</TableCell>
						<td></td>
					</TableRow>
				) : (
					filteredMergeData.map((data) => (
						<Fragment key={data.rating_id}>
							<TableRow className="bg-muted/50 text-center">
								<TableCell className="h-12">{data.recruitment_stage}</TableCell>
								<TableCell className="h-12">{formattedName(data.name)}</TableCell>
								<TableCell className="h-12">{formattedName(data.role)}</TableCell>
								<TableCell className="h-12">
									{formatDate(data.created_at as Date)}
								</TableCell>
								<TableCell className="h-12">
									<Link
										href={data.rate}
										target="blank"
										className="text-[#0F91D2]"
									>
										View
									</Link>
								</TableCell>
								<td></td>
							</TableRow>
						</Fragment>
					))
				)}
			</TableBody>
		</Table>
	);
}
