"use client";

import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { handleSubmitJobRequest } from "~/controller/JobRequestController";
import { SelectTagProps } from "~/types/types";

type JobRequestFormProps = {
	departmentId: number;
	selectedDepartment: string;
	officeId: number;
	selectedOffice: string;
};

export default function JobRequestForm({
	departmentId,
	selectedDepartment,
	officeId,
	selectedOffice,
}: JobRequestFormProps) {
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleSubmitJobRequest(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "A New Job Request Created!",
				description: "Thank you for submitting the form.",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<div className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-8 rounded-xl bg-white p-8 py-5 shadow-md">
				<h4 className="mt-10 scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
					Personnel Request Form
				</h4>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<LabelTag label="Requested Position" />
						<Input type="text" name="requested_position" className="w-full border-2" />
					</div>
					<div>
						<LabelTag label="Qualification Standards: Educational Background" />
						<Input
							placeholder="List minimum educational background..."
							type="text"
							name="minimum_qualifications"
							className="w-full border-2"
						/>
					</div>
					<div>
						<SelectTag
							name="requested_category"
							label="Category"
							placeholder="Choose a category..."
						>
							<SelectGroup>
								<SelectItem value="teaching_staff">Teaching Staff</SelectItem>
								<SelectItem value="non-teaching_staff">
									Non Teaching Staff
								</SelectItem>
							</SelectGroup>
						</SelectTag>
					</div>
					<div>
						<LabelTag label="Qualification Standards: Experience" />
						<Input
							placeholder="List minimum years of experience..."
							type="text"
							name="minimum_experience"
							className="w-full border-2"
						/>
					</div>
					<div>
						{selectedDepartment !== null && (
							<>
								<LabelTag label="Requested Department" />
								<Input
									type="text"
									name="requested_department"
									value={selectedDepartment}
									readOnly
									className="w-full border-2"
								/>
								<Input type="hidden" name="department_id" value={departmentId} />
							</>
						)}
						{selectedOffice !== null && (
							<>
								<LabelTag label="Requested Office" />
								<Input
									type="text"
									name="requested_office"
									value={selectedOffice}
									readOnly
									className="w-full border-2"
								/>
								<Input type="hidden" name="office_id" value={officeId} />
							</>
						)}
					</div>
					<div>
						<SelectTag
							name="requested_type"
							label="Type"
							placeholder="Select a type..."
						>
							<SelectGroup>
								<SelectItem value="full_time">Full Time</SelectItem>
								<SelectItem value="part_time">Part Time</SelectItem>
							</SelectGroup>
						</SelectTag>
					</div>
					<div>
						<LabelTag label="Description" />
						<Textarea
							name="requested_description"
							placeholder="Add Job Description."
							className="w-full border-2"
						/>
					</div>
					<div>
						<LabelTag label="Qualification" />
						<Textarea
							name="requested_qualification"
							placeholder="Add Job Qualification."
							className="w-full border-2"
						/>
					</div>
				</div>
				<div className="flex justify-center">
					<ConfirmationModal
						mainButton={
							<Button
								type="submit"
								className="bg-[#7F0000] hover:scale-95 hover:bg-[#7F0000]"
							>
								Submit Request Form
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
			</div>
		</form>
	);
}

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

function SelectTag({ label, name, placeholder, children }: SelectTagProps) {
	return (
		<div>
			<Label className="font-semibold text-[#666666]">{label}</Label>
			<Select name={name} required>
				<SelectTrigger className="w-full border-2">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>{children}</SelectContent>
			</Select>
		</div>
	);
}
