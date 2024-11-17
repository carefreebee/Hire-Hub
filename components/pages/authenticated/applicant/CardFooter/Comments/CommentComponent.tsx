import { getAllCommentsByID } from "~/controller/CommentController";
import { StageType } from "~/types/types";
import { formattedName, formattedNameAndRole } from "~/util/formatted-name";
import { GetCurrentStage } from "~/util/get-current-stage";
import CommentDisplay from "./CommentDisplay";

interface CommentDisplayProps {
	applicantId: string;
	stage: StageType;
}

export default async function CommentComponent({ applicantId, stage }: CommentDisplayProps) {
	const { applicantStage } = await GetCurrentStage(Number(applicantId), stage);

	const comment = await getAllCommentsByID(
		Number(applicantId),
		applicantStage?.comment_id as number[]
	);

	return (
		<>
			{comment.length === 0 ? (
				<div className="flex items-center justify-center gap-3">
					<p>Be the first one to comment.</p>
				</div>
			) : (
				comment.map((comment) => (
					<CommentDisplay
						key={comment?.id}
						comment={comment?.comment as string}
						evaluatorName={formattedName(comment?.commented_by as string)}
						evaluatorRole={formattedNameAndRole(comment?.commented_role as string, "_")}
					/>
				))
			)}
		</>
	);
}
