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
import {
	LoadingButtonMode,
	LoadingCardFooter,
} from "~/components/pages/authenticated/applicant/Card/SkeletonCard";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import CardContentComponent from "~/components/pages/authenticated/applicant/screening/CardContentComponent";
import CardFooterComponent from "~/components/pages/authenticated/applicant/screening/CardFooter";
import { TypographySmall } from "~/components/ui/typography-small";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { GetCurrentStage } from "~/util/get-current-stage";

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	const { applicant, applicantStage } = await GetCurrentStage(Number(params.id), "screening");

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

							<Suspense fallback={<LoadingButtonMode />}>
								<CardContentComponent applicantId={Number(params.id)} />
							</Suspense>
						</CardTopLeftSubContent>
						<DisplayDate date={applicantStage?.date as Date} />
					</CardSubContent>
				</CardContent>

				<Suspense fallback={<LoadingCardFooter />}>
					<CardFooterComponent applicantId={Number(params.id)} />
				</Suspense>
			</Card>

			<CommentsAndDocuments
				stage="screening"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
				resume={applicant?.resume as ResumeProps}
			/>
		</>
	);
}
