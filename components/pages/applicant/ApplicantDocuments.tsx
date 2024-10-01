"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { toast } from "~/components/ui/use-toast";
import { CreateApplicantForm } from "~/Controller/ApplicantFormController";
import { DepartmentSelect, OfficeSelect } from "~/lib/schema";
import { ConfirmationPopup } from "./ConfirmationPopUp";
import { FormContainer, Note, RadioGroupContainer } from "./FormContainer";
import { MultiUploader } from "./MultipleUploader";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

type ApplicantFormProps = {
	department: DepartmentSelect[];
	office: OfficeSelect[];
};

export default function NewApplicantForm({ department, office }: ApplicantFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [uploadFiles, setUploadFiles] = useState<{ name: string; url: string }[]>([]);
	const [selectedPosition, setSelectedPosition] = useState<
		"teaching_staff" | "non-teaching_staff"
	>();
	const router = useRouter();
	const [submitted, setSubmitted] = useState(false);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await CreateApplicantForm(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			setSubmitted(true);

			toast({
				title: "Applicant form submitted",
				description: "Thank you for submitting your application.",
			});
		} catch (error) {
			console.error("Error", { error });
			toast({
				variant: "destructive",
				title: "Error submitting form",
				description: "Please fill up the form correctly.",
			});
		}
	}

	const uniqueDepartmentIds = new Set();
	const uniqueDepartments: typeof department = [];

	department.forEach((dept) => {
		if (!uniqueDepartmentIds.has(dept.department_id)) {
			uniqueDepartmentIds.add(dept.department_id);
			uniqueDepartments.push(dept);
		}
	});

	const uniqueOfficeIds = new Set();
	const uniqueOffices: typeof office = [];

	office.forEach((dept) => {
		if (!uniqueOfficeIds.has(dept.office_id)) {
			uniqueOfficeIds.add(dept.office_id);
			uniqueOffices.push(dept);
		}
	});

	return (
		<div>
			<form
				ref={formRef}
				onSubmit={(e) => e.preventDefault()}
				className="space-y-8 text-[#A2A1A8]"
			>
				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2"></section>
				<div className="flex items-center justify-end">
					<ConfirmationModal
						mainButton={
							<Button
								type="button"
								className="w-36 bg-[#7F0000] hover:scale-95 hover:bg-[#5e1e1e]"
							>
								Next -&gt;
							</Button>
						}
						descriptionButtonLabel="Are you sure you want to submit the form?"
						cancelButtonLabel="No, cancel"
					>
						<AlertDialogAction className="w-full" onClick={handleSubmit}>
							Yes, submit
						</AlertDialogAction>
					</ConfirmationModal>
				</div>
			</form>
			{submitted && (
				<ConfirmationPopup
					message="Submitted Successfully."
					onConfirm={() => router.push("/")}
				/>
			)}
		</div>
	);
}
