import { MoreHorizontal } from "lucide-react";
import { getAllRaitingFormById } from "~/Controller/RatingFormsController";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
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
	id: number;
};

export default async function EvaluateComponent({ id }: EvaluateComponentProps) {
	// GETTING THE RATING FORM
	const ratingForm = await getAllRaitingFormById(id);
	if (!ratingForm) {
		return <CardContainer>No Rating Form yet.</CardContainer>;
	}

	console.log(ratingForm);

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
				<FilteredDisplay
					rating={ratingForm as RatingFormWithUserData[]}
					tableRowLength={tableRow.length}
				/>
			</TableBody>
		</Table>
	);
}

function CardContainer({ children }: { children: React.ReactNode }) {
	return (
		<Card className="my-0 h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 h-auto w-full flex-col gap-5 p-5">{children}</CardContent>
		</Card>
	);
}
