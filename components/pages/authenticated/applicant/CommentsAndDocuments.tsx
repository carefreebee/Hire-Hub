import { StageType } from "~/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ApplicantIDCard";
import CommentForm from "./CommentForm";
import ApplicantIDCommentDisplay from "./Comments/ApplicantIDCommentDisplay";

type CommentsProps = {
	stage: StageType;
	applicantId: string;
	evaluatorsId: string;
	resume: string;
	children: React.ReactNode;
};

export default function CommentsAndDocuments({
	stage,
	applicantId,
	evaluatorsId,
	resume,
	children,
}: CommentsProps) {
	return (
		<section className="flex gap-5">
			<Card className="my-0 flex-1">
				<CardHeader>
					<CardTitle>Comments</CardTitle>
				</CardHeader>
				<CardContent className="h-60 flex-col px-5 pb-5">
					<ApplicantIDCommentDisplay applicantId={applicantId} stage={stage || null} />
					<CommentForm applicantId={applicantId} evaluatorsId={evaluatorsId} />
				</CardContent>
			</Card>
			<Card className="my-0 flex-1">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Documents</CardTitle>
						{/* <Button className="bg-transparent text-[#407BFF] hover:bg-transparent">
							Download all
						</Button> */}
					</div>
				</CardHeader>
				<CardContent className="mt-0 flex-wrap gap-3 p-5">{children}</CardContent>
			</Card>
		</section>
	);
}
