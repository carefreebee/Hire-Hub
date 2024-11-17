import { getAllRaitingFormById } from "~/controller/RatingFormsController";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { RatingFormWithUserData } from "~/types/types";
import FilteredDisplay from "./FilteredDisplay";

type EvaluateComponentProps = {
	id: number;
	tableRowLength: number;
};

export default async function EvaluateComponent({ id, tableRowLength }: EvaluateComponentProps) {
	const ratingForm = await getAllRaitingFormById(id);

	if (!ratingForm) {
		return <CardContainer>No Rating Form yet.</CardContainer>;
	}

	return (
		<FilteredDisplay
			rating={ratingForm as RatingFormWithUserData[]}
			tableRowLength={tableRowLength}
		/>
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
