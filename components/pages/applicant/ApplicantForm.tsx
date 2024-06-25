"use client";

import { ChangeEvent, useRef, useState } from "react";
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
import { useToast } from "~/components/ui/use-toast";
import { handleSubmitApplicantForm } from "~/controller/ApplicantController";
import { UploadButton } from "~/util/uploadthing";
import { FormContainer, Note, RadioGroupContainer } from "./Form";

type ApplicantFormProps = {
	requestedDepartment: string[];
	requestedOffice: string[];
};

export default function ApplicantForm({
	requestedDepartment,
	requestedOffice,
}: ApplicantFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [resumeUrl, setResumeUrl] = useState<string | undefined>("");
	const [selectedPosition, setSelectedPosition] = useState<
		"teaching_staff" | "non-teaching_staff"
	>();
	const { toast } = useToast();

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleSubmitApplicantForm(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Applicant form submitted",
				description: "Please wait at least 5 days",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
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
						type="text"
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
					{/* <RadioGroupContainer
						label="Choose the type you are applying for"
						name="type_applying_for"
						FirstRadioGroupItemValue="teaching_staff"
						FirstRadioGroupItemLabel="Teaching Staff"
						SecondRadioGroupItemValue="non-teaching_staff"
						SecondRadioGroupItemLabel="Non-Teaching Staff"
					/> */}
					<div className="h-[66px]">
						<Label className="font-semibold">
							Choose the type you are applying for
						</Label>
						<div className="mt-3 font-semibold">
							<RadioGroup
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setSelectedPosition(
										e.target.value as "teaching_staff" | "non-teaching_staff"
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
							Choose the college/ department you are applying for:
						</Label>
						{selectedPosition === "teaching_staff" ? (
							<Select name="selected_department" required>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Choose a department..." />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Fruits</SelectLabel>
										{requestedDepartment.map((department, index) => (
											<SelectItem key={index} value={department}>
												{department}
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
										<SelectLabel>Fruits</SelectLabel>
										{requestedOffice.map((office, index) => (
											<SelectItem key={index} value={office}>
												{office}
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

					{/* IMAGE INPUT */}
					<input
						type="text"
						name="resume"
						// value={resumeUrl!}
						// readOnly
						className="text-black"
					/>

					{/* TODO: UPLOAD FILE */}
					<UploadButton
						endpoint="productPdf"
						onClientUploadComplete={(res) => {
							// Do something with the response
							setResumeUrl(res[0].url);
							toast({
								title: "Resume uploaded",
								description: "Resume uploaded successfully",
							});
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</section>
			</section>
			<div className="flex items-center justify-center">
				<Button
					onClick={handleSubmit}
					className="bg-[#7F0000] hover:scale-95 hover:bg-[#5e1e1e]"
				>
					Submit Application
				</Button>
			</div>
		</form>
	);
}
