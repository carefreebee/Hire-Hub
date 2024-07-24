"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

type CommentDisplayProps = {
	comment: string;
	evaluatorName: string;
	evaluatorRole: string;
};

export default function CommentDisplay({
	comment,
	evaluatorName,
	evaluatorRole,
}: CommentDisplayProps) {
	const [seeMore, setSeeMore] = useState(false);

	function handleSeeMore() {
		setSeeMore(!seeMore);
	}

	const checkCommentLength = comment.length > 101;

	return (
		<div className="flex gap-3">
			<div className="h-12 w-12 rounded-full bg-slate-400"></div>
			<div className="flex-1">
				<p className="text-sm">
					{evaluatorName} | {evaluatorRole}
				</p>
				<p
					className={`${seeMore ? "h-auto" : "h-10"} overflow-hidden text-sm text-[#949498]`}
				>
					{comment}
				</p>
				{checkCommentLength && (
					<Button
						variant={"ghost"}
						onClick={handleSeeMore}
						className="mt-2 h-auto px-0 py-1 text-xs hover:bg-transparent"
					>
						{seeMore ? "See Less" : "See More"}
					</Button>
				)}
			</div>
		</div>
	);
}
