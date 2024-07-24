import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { getAllRaitingFormByIdInEachStages } from "~/Controller/RatingFormsController";
import { RatingFormWithUserData, ResumeProps, StageType } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/CardComponent";
import { LoadingComment } from "../Card/SkeletonCard";
import CommentComponent from "./Comments/CommentComponent";
import CommentForm from "./Comments/CommentForm";

type CommentsProps = {
	stage: StageType;
	applicantId: string;
	evaluatorsId: string;
	resume: ResumeProps;
	document?: Partial<RatingFormWithUserData>[];
	ratingFormId?: number[];
};

export default function CommentsAndDocuments({
	stage,
	applicantId,
	evaluatorsId,
	resume,
	document,
	ratingFormId,
}: CommentsProps) {
	const { resume_name, resume_url, letter_name, letter_url } = resume;

	return (
		<section className="flex gap-5">
			<Card className="my-0 flex-1">
				<CardHeader>
					<CardTitle>Comments</CardTitle>
				</CardHeader>
				<CardContent className="h-60 flex-col px-5 pb-5">
					<div className="flex h-[180px] flex-1 flex-col gap-3 overflow-y-auto pb-3">
						<Suspense fallback={<LoadingComment />}>
							<CommentComponent applicantId={applicantId} stage={stage || null} />
						</Suspense>
					</div>
					<CommentForm applicantId={applicantId} evaluatorsId={evaluatorsId} />
				</CardContent>
			</Card>
			<Card className="my-0 flex-1">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Documents</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="mt-0 flex-wrap gap-3 p-5">
					<ApplicantDocumentDisplay url={resume_url} name={resume_name} />
					<ApplicantDocumentDisplay url={letter_url} name={letter_name} />

					<Suspense fallback={<>Loading...</>}>
						<RatingFormDisplay
							applicantId={applicantId}
							ratingFormId={ratingFormId as number[]}
							document={document as Partial<RatingFormWithUserData>[]}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</section>
	);
}

function ApplicantDocumentDisplay({ url, name }: { url: string; name: string }) {
	return (
		<Button
			variant={"outline"}
			asChild
			className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
		>
			<Link href={url} target="_blank">
				{/* {RemoveExtension(name)} */}
				{name}
			</Link>
		</Button>
	);
}

type RatingFormDisplayProps = {
	applicantId: string;
	ratingFormId: number[];
	document: Partial<RatingFormWithUserData>[];
};

async function RatingFormDisplay({ applicantId, ratingFormId, document }: RatingFormDisplayProps) {
	const ratingForms = await getAllRaitingFormByIdInEachStages(Number(applicantId), ratingFormId);

	return (
		<>
			{ratingForms &&
				ratingForms.map((ratingForm) => (
					<Button
						key={ratingForm.rate}
						variant={"outline"}
						asChild
						className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
					>
						<Link href={ratingForm?.rate as string} target="_blank">
							{ratingForm.recruitment_stage}{" "}
							{formattedNameAndRole(ratingForm?.role as string, "_")}
						</Link>
					</Button>
				))}

			{document &&
				document.map((doc) => (
					<Button
						key={doc.rate}
						variant={"outline"}
						asChild
						className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
					>
						<Link href={doc?.rate as string} target="_blank">
							{doc.recruitment_stage} {formattedNameAndRole(doc?.role as string, "_")}
						</Link>
					</Button>
				))}
		</>
	);
}