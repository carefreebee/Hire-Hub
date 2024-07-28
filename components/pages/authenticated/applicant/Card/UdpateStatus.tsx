"use client";

import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import UpdateSvg from "~/components/ui/update-svg";
import { toast } from "~/components/ui/use-toast";
import { UpdateScreening } from "~/Controller/ApplicantStatusController";
import { useSelectPassedOrFailed } from "~/util/zustand";

type ApplicantIDFooterProps = {
	id: number;
	assessorId: string;
};

export default function UpdateStatus({ id, assessorId }: ApplicantIDFooterProps) {
	const status = useSelectPassedOrFailed((state) => state.status);
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await UpdateScreening(formData);
			toast({
				title: "Status Updated!",
				description: "The status has been updated successfully",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error Updating Status!",
				description: "Please select a Passed or Failed",
			});
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="ml-auto">
			<input type="hidden" name="applicant_id" value={id} readOnly />
			<input type="hidden" name="assessed_by_id" value={assessorId} readOnly />
			<input type="hidden" name="applicant_status" value={status} readOnly />
			<ConfirmationModal
				mainButton={
					<Button type="submit" variant={"ghost"} className="text-[#0F91D2]">
						<UpdateSvg /> <span className="ml-2">Update</span>
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
	);
}
