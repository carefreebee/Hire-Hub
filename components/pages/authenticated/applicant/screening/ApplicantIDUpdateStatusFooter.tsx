"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { UpdateScreeningAndInitialInterviewStatus } from "~/controller/ApplicantStatusController";
import { CheckPathname } from "~/util/path";
import { useSelectPassedOrFailed } from "~/util/zustand";

type ApplicantIDFooterProps = {
	id: number;
	assessorId: string;
};

export default function ApplicantIDUpdateStatusFooter({ id, assessorId }: ApplicantIDFooterProps) {
	const status = useSelectPassedOrFailed((state) => state.status);
	const formRef = useRef<HTMLFormElement>(null);
	const pathname = usePathname();
	const lastSegment = CheckPathname(pathname);

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await UpdateScreeningAndInitialInterviewStatus(formData);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="ml-auto">
			<input type="hidden" name="pathname" value={lastSegment} readOnly />
			<input type="hidden" name="applicant_id" value={id} readOnly />
			<input type="hidden" name="assessed_by_id" value={assessorId} readOnly />
			<input type="hidden" name="applicant_status" value={status} readOnly />
			<ConfirmationModal
				mainButton={
					<Button type="submit" variant={"ghost"} className="text-[#0F91D2]">
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
	);
}
