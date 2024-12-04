import { Suspense } from "react";
import { RatingFormWithUserData, ResumeProps, StageType } from "~/types/types";
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
		</section>
	);
}

// function ApplicantDocumentDisplay({ url, name }: { url: string; name: string }) {
// 	return (
// 		<Button
// 			variant={"outline"}
// 			asChild
// 			className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
// 		>
// 			<Link href={url} target="_blank">
// 				{/* {RemoveExtension(name)} */}
// 				{name}
// 			</Link>
// 		</Button>
// 	);
// }

// type RatingFormDisplayProps = {
// 	applicantId: string;
// 	ratingFormId: number[];
// 	document: Partial<RatingFormWithUserData>[];
// };

// async function RatingFormDisplay({ applicantId, ratingFormId, document }: RatingFormDisplayProps) {
// 	const ratingForms = await getAllRaitingFormByIdInEachStages(Number(applicantId), ratingFormId);

// 	return (
// 		<>
// 			{ratingForms &&
// 				ratingForms.map((ratingForm, index) => (
// 					<Button
// 						key={String(ratingForm.rate || index)}
// 						variant={"outline"}
// 						asChild
// 						className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
// 					>
// 						<Link href={ratingForm?.rate as string} target="_blank">
// 							{ratingForm.recruitment_stage}{" "}
// 							{formattedNameAndRole(ratingForm?.role as string, "_")}
// 						</Link>
// 					</Button>
// 				))}

// 			{document &&
// 				document.map((doc) => (
// 					<Button
// 						key={doc.rate}
// 						variant={"outline"}
// 						asChild
// 						className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
// 					>
// 						<Link href={doc?.rate as object} target="_blank">
// 							{doc.recruitment_stage} {formattedNameAndRole(doc?.role as string, "_")}
// 						</Link>
// 					</Button>
// 				))}
// 		</>
// 	);
// }
