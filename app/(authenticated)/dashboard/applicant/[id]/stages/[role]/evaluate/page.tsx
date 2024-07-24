import { MoreHorizontal } from "lucide-react";
import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { LoadingEvaluateTable } from "~/components/pages/authenticated/applicant/Card/SkeletonCard";
import EvaluateComponent from "~/components/pages/authenticated/applicant/evaluate/EvaluateComponent";
import FilterEvaluate from "~/components/pages/authenticated/applicant/evaluate/FilterEvaluate";
import UpdateButton from "~/components/pages/authenticated/applicant/evaluate/UpdateButton";
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

export default function EvaluatePage({ params }: { params: { id: string } }) {
	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 flex h-[550px] w-full flex-col justify-between gap-5 p-5">
				<Table>
					<TableHeader className="rounded-md border-2 border-b-2">
						<TableRow>
							{tableRow.map((table) => (
								<TableHead key={table.name} className="h-auto">
									<Button
										variant={"ghost"}
										className="h-auto hover:bg-transparent"
									>
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
						<Suspense
							fallback={<LoadingEvaluateTable tableRowLength={tableRow.length} />}
						>
							<EvaluateComponent
								id={Number(params.id)}
								tableRowLength={tableRow.length}
							/>
						</Suspense>
					</TableBody>
				</Table>

				<CardFooter className="pt-5">
					<Suspense fallback={<p>Loading...</p>}>
						<UpdateButton applicantId={Number(params.id)} />
					</Suspense>
				</CardFooter>
			</CardContent>
		</Card>
	);
}
