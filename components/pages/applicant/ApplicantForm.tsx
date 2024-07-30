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

type ApplicantFormProps = {
	department: DepartmentSelect[];
	office: OfficeSelect[];
};

export default function ApplicantForm({ department, office }: ApplicantFormProps) {
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
				className="space-y-8 text-[#344054]"
			>
				<section className="flex gap-10">
					<section className="flex flex-1 flex-col gap-5">
						<FormContainer
							label="First Name"
							type="text"
							name="first_name"
							minLength={2}
							maxLength={100}
						/>
						<FormContainer
							label="Last Name"
							type="text"
							name="last_name"
							minLength={2}
							maxLength={100}
						/>
						<FormContainer label="Email" type="email" name="email" />
						<FormContainer
							label="Contact Number"
							type="number"
							name="contact_number"
							inputMode="numeric"
						/>
						<RadioGroupContainer
							label="Preferred mode of communication"
							name="communication_type"
							FirstRadioGroupItemValue="email"
							FirstRadioGroupItemLabel="Email"
							SecondRadioGroupItemValue="phone_number"
							SecondRadioGroupItemLabel="Phone Number"
						/>
					</section>
					<section className="flex flex-1 flex-col gap-5">
						<div className="h-[66px]">
							<Label className="font-semibold">
								Select the type you are applying for:
							</Label>
							<div className="mt-3 font-semibold">
								<RadioGroup
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setSelectedPosition(
											e.target.value as
												| "teaching_staff"
												| "non-teaching_staff"
										)
									}
									name="positionType"
									className="flex"
								>
									<div className="flex flex-1 items-center space-x-2">
										<RadioGroupItem value="teaching_staff" id="r1" />
										<Label htmlFor="r1" className="font-semibold">
											Teaching Staff
										</Label>
									</div>
									<div className="flex flex-1 items-center space-x-2">
										<RadioGroupItem value="non-teaching_staff" id="r2" />
										<Label htmlFor="r2" className="font-semibold">
											Non-Teaching Staff
										</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
						<FormContainer
							label="Position Applied"
							type="position_applied"
							name="position_applied"
						/>

						<div className="flex h-[66px] flex-col gap-3">
							<Label className="font-semibold">
								Select the department/office you are applying for:
							</Label>
							{selectedPosition === "teaching_staff" ? (
								<Select name="selected_department" required>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Choose a department..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Department</SelectLabel>
											{uniqueDepartments.map((department) => (
												<SelectItem
													key={department.department_id}
													value={department.department_name}
												>
													<input
														type="hidden"
														name="department_id"
														value={department.department_id}
														readOnly
													/>
													{department.department_name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							) : selectedPosition === "non-teaching_staff" ? (
								<Select name="selected_office" required>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Choose an office..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Office</SelectLabel>
											{uniqueOffices.map((office) => (
												<SelectItem
													key={office.office_id}
													value={office.office_name}
												>
													<input
														type="hidden"
														name="office_id"
														value={office.office_id}
														readOnly
													/>
													{office.office_name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							) : (
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Choose a department..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												Please select first a type you are applying for
											</SelectLabel>
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						</div>

						<Note />

						{/* RESUME INPUT */}
						<input
							type="hidden"
							name="resume_name"
							defaultValue={uploadFiles[0]?.name}
							readOnly
							className="text-black"
						/>
						<input
							type="hidden"
							name="resume_url"
							defaultValue={uploadFiles[0]?.url}
							readOnly
							className="text-black"
						/>

						<input
							type="hidden"
							name="letter_name"
							defaultValue={uploadFiles[1]?.name}
							readOnly
							className="text-black"
						/>
						<input
							type="hidden"
							name="letter_url"
							defaultValue={uploadFiles[1]?.url}
							readOnly
							className="text-black"
						/>

						<MultiUploader setUploadFiles={setUploadFiles} />
					</section>
				</section>
				<div className="flex items-center justify-center">
					<ConfirmationModal
						mainButton={
							<Button
								type="button"
								className="bg-[#7F0000] hover:scale-95 hover:bg-[#5e1e1e]"
							>
								Submit Application
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
