"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import {
	handleSubmitInitialInterviewComment,
	handleSubmitPanelInterviewComment,
	handleSubmitPsychologicalExamComment,
	handleSubmitRecommendationForHiringComment,
	handleSubmitScreeningComment,
	handleSubmitTeachingDemo,
} from "~/controller/CommentController";
import { CheckPathname } from "~/util/path";

type CommentFormProps = {
	applicantId: string;
	evaluatorsId: string;
};

export default function CommentForm({ applicantId, evaluatorsId }: CommentFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const pathname = usePathname();
	const lastSegment = CheckPathname(pathname);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			if (lastSegment === "screening") {
				await handleSubmitScreeningComment(formData);
			} else if (lastSegment === "initial-interview") {
				await handleSubmitInitialInterviewComment(formData);
			} else if (lastSegment === "teaching-demo") {
				await handleSubmitTeachingDemo(formData);
			} else if (lastSegment === "psychological-exam") {
				await handleSubmitPsychologicalExamComment(formData);
			} else if (lastSegment === "panel-interview") {
				await handleSubmitPanelInterviewComment(formData);
			} else if (lastSegment === "recommendation-for-hiring") {
				await handleSubmitRecommendationForHiringComment(formData);
			}
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Comment submitted!",
				description: "Your comment has been submitted successfully.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error submitting comment!",
				description: "Comment must be at least 5 characters long. Please try again.",
			});
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="flex w-full gap-3">
			<input type="hidden" name="applicant_id" value={applicantId} readOnly />
			<input type="hidden" name="evaluators_id" value={evaluatorsId} readOnly />
			<Input type="text" name="comment" placeholder="Add Comment" />
			<ConfirmationModal
				mainButton={
					<Button type="submit" variant={"outline"}>
						Submit
					</Button>
				}
				descriptionButtonLabel="Are you sure you want to submit the form?"
				cancelButtonLabel="No, cancel"
			>
				<AlertDialogAction className="w-full" onClick={handleSubmit}>
					Yes, submit
				</AlertDialogAction>
			</ConfirmationModal>
		</form>
	);
}
