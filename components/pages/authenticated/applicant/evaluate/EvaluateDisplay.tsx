import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
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

type EvaluateDisplayProps = {
	mergedData: RatingFormWithUserData[];
};

export default function EvaluateDisplay({ mergedData }: EvaluateDisplayProps) {
	return (
		<>
			<Table className="text-sm">
				<TableHeader className="rounded-md border-2 border-b-2">
					<TableRow>
						<TableHead className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								Recruitment Stage
							</Button>
						</TableHead>
						<TableHead className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								Evaluator Name
							</Button>
						</TableHead>
						<TableHead className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								Role
							</Button>
						</TableHead>
						<TableHead className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								Evaluate Date
							</Button>
						</TableHead>
						<TableHead className="h-auto">
							<Button variant={"ghost"} className="h-auto hover:bg-transparent">
								Rating Form
							</Button>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-b-0">
						<TableCell className="h-5"></TableCell>
					</TableRow>
					{mergedData.map((data) => (
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
							</TableRow>
						</Fragment>
					))}
				</TableBody>
			</Table>
		</>
	);
}
