"use client";

import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { handleUdpateApplicantStatusScreeningStatus } from "~/controller/ApplicantController";
import { useSelectPassedOrFailed } from "~/util/zustand";

type ApplicantIDFooterProps = {
	id: number;
};

export default function ApplicantIDUpdateStatusFooter({ id }: ApplicantIDFooterProps) {
	const status = useSelectPassedOrFailed((state) => state.status);
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await handleUdpateApplicantStatusScreeningStatus(formData);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<>
			<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="ml-auto">
				<input type="hidden" name="applicant_id" value={id} readOnly />
				<input type="hidden" name="applicant_status" value={status} readOnly />
				<ConfirmationModal
					mainButton={
						<Button type="submit" variant={"ghost"}>
							Update
						</Button>
					}
					descriptionButtonLabel="Are you sure you want to update Applicant Status"
					cancelButtonLabel="No, cancel"
				>
					<AlertDialogAction className="w-full" onClick={handleSubmit}>
						Yes, submit
					</AlertDialogAction>
				</ConfirmationModal>
			</form>
		</>
	);
}
