import { StageType } from "~/types/types";
import { Button } from "../../ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../authenticated/applicant/ApplicantIDCard";
import ApplicantResume from "../authenticated/applicant/ApplicantResume";
import CommentForm from "../authenticated/applicant/CommentForm";
import ApplicantIDCommentDisplay from "../authenticated/applicant/screening/ApplicantIDCommentDisplay";

type CommentsAndDocumentsProps = {
	stage: StageType;
	applicantId: string;
	evaluatorsId: string;
};

export default function CommentsAndDocuments({ stage, applicantId, evaluatorsId }: CommentsAndDocumentsProps) {
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
						<Button className="bg-transparent text-[#407BFF] hover:bg-transparent">
							Download all
						</Button>
					</div>
				</CardHeader>
				<CardContent className="mt-0 gap-3 p-5">
					<ApplicantResume applicantId={applicantId} />
				</CardContent>
			</Card>
		</section>
	);
}
