import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import EvaluateComponent from "~/components/pages/authenticated/applicant/evaluate/EvaluateComponent";
import UpdateButton from "~/components/pages/authenticated/applicant/evaluate/UpdateButton";

export default function EvaluatePage({ params }: { params: { id: string } }) {
	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>Evaluate Applicant</CardTitle>
			</CardHeader>
			<CardContent className="mt-0 flex h-[550px] w-full flex-col justify-between gap-5 p-5">
				<Suspense fallback={<p>Loading...</p>}>
					<EvaluateComponent id={Number(params.id)} />
				</Suspense>
				<CardFooter className="pt-5">
					<Suspense fallback={<p>Loading...</p>}>
						<UpdateButton applicantId={Number(params.id)} />
					</Suspense>
				</CardFooter>
			</CardContent>
		</Card>
	);
}
