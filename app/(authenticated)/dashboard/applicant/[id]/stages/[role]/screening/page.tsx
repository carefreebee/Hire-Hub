import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DisplayDate from "~/components/pages/authenticated/applicant/Card/DisplayDate";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import CardContentComponent from "~/components/pages/authenticated/applicant/screening/CardContentComponent";
import CardFooterComponent from "~/components/pages/authenticated/applicant/screening/CardFooter";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();

	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "screening");
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Screening</CardTitle>
				</CardHeader>
				<CardContent>
					<CardSubContent>
						<CardTopLeftSubContent>
							<TypographySmall size={"md"}>Screening</TypographySmall>
							<Suspense fallback={<p>Loading...</p>}>
								<CardContentComponent applicantId={Number(params.id)} />
							</Suspense>
						</CardTopLeftSubContent>
					<DisplayDate date={applicantStage?.date as Date} />
					</CardSubContent>
				</CardContent>

				<Suspense fallback={<p>Loading...</p>}>
					<CardFooterComponent applicantId={Number(params.id)} />
				</Suspense>
			</Card>

			<CommentsAndDocuments
				stage="screening"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume_name={resume_name}
				resume_url={resume_url}
				letter_name={letter_name}
				letter_url={letter_url}
			/>
		</>
	);
}
