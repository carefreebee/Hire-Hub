"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { handleDeptOrOfficeUpdatesApplicantStatusTeachingDemo, hanldeDeptOrOfficeUpdatesApplicantInitialInterview } from "~/controller/DeptOrOfficeUpdatesApplicantStatusController";
import { handleHrHeadUpdatesApplicantStatusTeachingDemo } from "~/controller/HrHeadUpdatesApplicantStatusController";
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
				await hanldeDeptOrOfficeUpdatesApplicantInitialInterview(formData);
				// await hanldeDepartmentOrOfficeUdpatesApplicantInitialInterview(formData);
			} else if (lastSegment === "teaching-demo") {
				await handleDeptOrOfficeUpdatesApplicantStatusTeachingDemo(formData);
			} else if (lastSegment === "pyschological-exam") {
				// await handleUdpateApplicantStatusInitialInterview(formData);
			} else if (lastSegment === "panel-interview") {
				// await handleUdpateApplicantStatusInitialInterview(formData);
			} else if (lastSegment === "recommendation-for-hiring") {
				// await handleUdpateApplicantStatusInitialInterview(formData);
			}
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<input type="hidden" name="applicant_id" value={id} readOnly />
			<input type="hidden" name="user_id" value={evaluatorsId} readOnly />
			<input type="hidden" name="recruitment_stage" value={recruitment_stage} readOnly />
			<Input
				type="text"
				name="rate"
				defaultValue={file as string}
				// readOnly
				className="text-black"
			/>
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
