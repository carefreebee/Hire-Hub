import { getUserByID } from "~/Controller/UsersController";
import { StageType } from "~/types/types";
import { formattedName, formattedNameAndRole } from "~/util/formatted-name";
import { GetCommentsById } from "~/util/get-comments";
import { GetCurrentStage } from "~/util/get-current-stage";
import CommentDisplay from "./CommentDisplay";

interface CommentDisplayProps {
	applicantId: string;
	stage: StageType;
}

export default async function CommentComponent({ applicantId, stage }: CommentDisplayProps) {
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicantStage } = await GetCurrentStage(Number(applicantId), stage);

	const comments = await GetCommentsById((applicantStage?.comment_id as number[]) || []);

	if (!comments || comments.length === 0) {
		return (
			<p className="flex h-[180px] flex-col items-center justify-center pb-3 text-[#949498]">
				No comments yet.
			</p>
		);
	}

	const evaluatorsPromises = comments.map((comment) =>
		getUserByID(comment?.commented_by as string)
	);
	const evaluators = await Promise.all(evaluatorsPromises);

	const evaluatorMap = new Map(evaluators.map((evaluator) => [evaluator?.id, evaluator]));

	return (
		<div className="flex h-[180px] flex-1 flex-col gap-3 overflow-y-auto pb-3">
			{comments.map((comment) => {
				const evaluator = evaluatorMap.get(comment?.commented_by as string);
				return (
					<CommentDisplay
						key={comment?.id}
						id={comment?.id as number}
						comment={comment?.comment as string}
						evaluatorName={formattedName(evaluator?.name as string)}
						evaluatorRole={formattedNameAndRole(evaluator?.role as string, "_")}
					/>
				);
			})}
		</div>
	);
}
