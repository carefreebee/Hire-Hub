import { getUserByID } from "~/Controller/UsersController";
import { StageType } from "~/types/types";
import { GetCommentsById } from "~/util/get-comments";
import { GetCurrentStage } from "~/util/get-current-stage";

interface ApplicantIDCommentDisplayProps {
	applicantId: string;
	stage: StageType;
}

export default async function ApplicantIDCommentDisplay({
	applicantId,
	stage,
}: ApplicantIDCommentDisplayProps) {
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
					<div key={comment?.id} className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-slate-400"></div>
						<div className="flex-1">
							<p className="text-sm">
								{evaluator?.name} | {evaluator?.role}
							</p>
							<small className="text-[#949498]">{comment?.comment}</small>
						</div>
					</div>
				);
			})}
		</div>
	);
}
