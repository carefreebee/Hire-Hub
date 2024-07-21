import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
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
import { RatingFormWithUserData } from "~/types/types";
import FilterEvaluate from "./FilterEvaluate";
import FilteredDisplay from "./FilteredDisplay";

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

type EvaluateComponentProps = {
	mergedData: RatingFormWithUserData[];
};

export default function EvaluateComponent({ mergedData }: EvaluateComponentProps) {
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
									<FilterEvaluate key={stage.name} name={stage.name} />
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
				<FilteredDisplay mergedData={mergedData} tableRowLength={tableRow.length} />
			</TableBody>
		</Table>
	);
}
