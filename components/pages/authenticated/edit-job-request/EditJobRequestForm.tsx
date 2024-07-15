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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { handleEditJobRequest } from "~/Controller/JobRequestController";
import { JobRequestSelect } from "~/lib/schema";

type EditJobrequestFormProps = {
	jobRequestByID: JobRequestSelect;
	id: number;
};

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

export default function EditJobrequestForm({ jobRequestByID, id }: EditJobrequestFormProps) {
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleEditJobRequest(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Updated Successfully.",
				description: "Job Request has been updated successfully.",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form
			ref={formRef}
			onSubmit={(e) => e.preventDefault()}
			className="mx-auto flex w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-10 shadow-md"
		>
			<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
				Edit Request Details
			</h4>
			<input type="hidden" name="request_id" value={id} readOnly />
			<div className="mx-auto w-[564px]">
				<LabelTag label="Requested Position" />
				<Input
					defaultValue={jobRequestByID?.requested_position}
					name="requested_position"
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag label="Category" />
				<Input
					value={
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? TeachingStaff
							: NonTeachingStaff
					}
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag
					label={
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? "Department"
							: "Office"
					}
				/>
				<Input
					value={
						jobRequestByID?.requested_department || jobRequestByID?.requested_office!
					}
					name={`${
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? "requested_department"
							: "requested_office"
					}`}
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag label="Type" />
				<Select name="requested_type" defaultValue={jobRequestByID?.requested_type}>
					<SelectTrigger className="border-2">
						<SelectValue placeholder="Select Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="full_time">Full Time</SelectItem>
						<SelectItem value="part_time">Part Time</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="mx-auto grid w-[564px] gap-1.5">
				<LabelTag label="Description" />
				<Textarea
					defaultValue={jobRequestByID?.requested_description}
					name="requested_description"
					className="border-2"
				/>
			</div>

			<div className="mx-auto grid w-[564px] gap-1.5">
				<LabelTag label="Qualification" />
				<Textarea
					defaultValue={jobRequestByID?.requested_qualification}
					name="requested_qualification"
					className="border-2"
				/>
			</div>
			<div className="flex justify-center">
				<ConfirmationModal
					mainButton={
						<Button
							type="submit"
							className="bg-[#7F0000] hover:scale-95 hover:bg-[#7F0000]"
						>
							Submit Edited Request Form
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
	);
}
