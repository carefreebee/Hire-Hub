"use client";

import { useRouter } from "next/navigation";
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
import { handleSubmitJobRequest } from "~/controller/JobRequestController";
import { useSelectedCategoryOptions } from "~/hooks/useSelectedCategoryOptions";
import { SelectTagProps } from "~/types/types";

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

function SelectTag({ label, name, placeholder, children, onValueChange }: SelectTagProps) {
	return (
		<div className="mx-auto flex h-[66px] w-[564px] flex-col gap-3">
			<Label className="font-semibold text-[#666666]">{label}</Label>
			<Select name={name} required onValueChange={onValueChange}>
				<SelectTrigger className="w-full border-2">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>{children}</SelectContent>
			</Select>
		</div>
	);
}

export default function Form() {
	const { selectedCategory, handleChangeCategory } = useSelectedCategoryOptions();
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleSubmitJobRequest(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			router.refresh();
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<div className="mx-auto flex w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-5 shadow-md">
				<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
					Personnel Request Form
				</h4>
				<div className="mx-auto w-[564px]">
					<LabelTag label="Requested Position" />
					<Input type="text" name="requested_position" className="border-2" />
				</div>

				<SelectTag
					name="requested_category"
					label="Category"
					placeholder="Choose a category..."
					onValueChange={handleChangeCategory}
				>
					<SelectGroup>
						<SelectItem value="teaching_staff">Teaching Staff</SelectItem>
						<SelectItem value="non-teaching_staff">Non Teaching Staff</SelectItem>
					</SelectGroup>
				</SelectTag>

				<div className="mx-auto w-[564px]">
					<LabelTag
						label={`${selectedCategory === "teaching_staff" ? "Requested Department" : "Requested Office"}`}
					/>
					{
						<Input
							type="text"
							name={`${selectedCategory === "teaching_staff" ? "requested_department" : "requested_office"}`}
							className="border-2"
						/>
					}
				</div>

				<SelectTag name="requested_type" label="Type" placeholder="Select a type...">
					<SelectGroup>
						<SelectItem value="full_time">Full Time</SelectItem>
						<SelectItem value="part_time">Part Time</SelectItem>
					</SelectGroup>
				</SelectTag>

				<div className="mx-auto grid w-[564px] gap-1.5">
					<LabelTag label="Description" />
					<Textarea
						name="requested_description"
						placeholder="Add Job Description."
						className="border-2"
					/>
				</div>

				<div className="mx-auto grid w-[564px] gap-1.5">
					<LabelTag label="Qualification" />
					<Textarea
						name="requested_qualification"
						placeholder="Add Job Qualification."
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
