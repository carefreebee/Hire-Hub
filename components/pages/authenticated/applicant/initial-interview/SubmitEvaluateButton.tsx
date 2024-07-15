"use client";

import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { handleUpdateEvaluateApplicantStatus } from "~/Controller/RatingFormsController";
import { useSelectPassedOrFailed } from "~/util/zustand";

export default function SubmitEvaluateButton({ id }: { id: string }) {
	const status = useSelectPassedOrFailed((state) => state.status);
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleUpdateEvaluateApplicantStatus(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Status Updated Success.",
				description: "Status Updated Successfully.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error Updating Status",
				description: "Please select passed or failed.",
			});
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<input type="hidden" name="applicant_id" value={id} readOnly />
			<input type="hidden" name="status" value={status} readOnly />
			<ConfirmationModal
				mainButton={
					<Button variant={"outline"} className="text-[#0F91D2] hover:text-[#0F91D2]">
						Udpate Status
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
