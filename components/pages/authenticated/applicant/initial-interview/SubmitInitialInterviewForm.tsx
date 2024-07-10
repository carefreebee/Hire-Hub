"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import {
	updateInitialInterviewForm,
	updatePanelInterview,
	updatePsychologicalExam,
	updateRecommendationForHiring,
	updateTeachingDemoForm,
} from "~/controller/DeptOrOfficeUpdatesApplicantStatusController";
import { CheckPathname } from "~/util/path";
import { useUploadDropZone } from "~/util/zustand";

type SubmitInitialInterviewFormProps = {
	id: string;
	evaluatorsId: string;
	recruitment_stage: string;
};

export default function SubmitInitialInterviewForm({
	id,
	evaluatorsId,
	recruitment_stage,
}: SubmitInitialInterviewFormProps) {
	const file = useUploadDropZone((state) => state.file);
	const formRef = useRef<HTMLFormElement>(null);

	const pathname = usePathname();
	const lastSegment = CheckPathname(pathname);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			if (lastSegment === "initial-interview") {
				await updateInitialInterviewForm(formData);
			} else if (lastSegment === "teaching-demo") {
				await updateTeachingDemoForm(formData);
			} else if (lastSegment === "psychological-exam") {
				await updatePsychologicalExam(formData);
			} else if (lastSegment === "panel-interview") {
				await updatePanelInterview(formData);
			} else if (lastSegment === "recommendation-for-hiring") {
				await updateRecommendationForHiring(formData);
			}
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Rating Form Submitted!",
				description: "Rating Form Submitted Successfully.",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<input type="hidden" name="applicant_id" value={id} readOnly />
			<input type="hidden" name="user_id" value={evaluatorsId} readOnly />
			<input type="hidden" name="recruitment_stage" value={recruitment_stage} readOnly />
			{/* INPUT BELOW THE TYPE MUST BE HIDDEN, DEFAULTVALUE SHOULD BE VALUE. AND SET INTO READONLY */}
			<Input type="text" name="rate" defaultValue={file as string} className="text-black" />
			<ConfirmationModal
				mainButton={
					<Button variant={"outline"} className="text-[#0F91D2] hover:text-[#0F91D2]">
						Submit Form
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
