"use client";

import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { handleSubmitApplicantForm } from "~/controller/ApplicantController";
import { FormContainer, Note, RadioGroupContainer, SelectTag } from "./Form";
import { UploadButton } from "~/util/uploadthing";

export default function ApplicantForm() {
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await handleSubmitApplicantForm(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
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
						FirstRadioGroupItemValue="email"
						FirstRadioGroupItemLabel="Email"
						SecondRadioGroupItemValue="phone_number"
						SecondRadioGroupItemLabel="Phone Number"
					/>
				</section>
				<section className="flex flex-1 flex-col gap-5">
					<RadioGroupContainer
						label="Choose the type you are applying for"
						FirstRadioGroupItemValue="teaching_staff"
						FirstRadioGroupItemLabel="Teaching Staff"
						SecondRadioGroupItemValue="non-teaching_staff"
						SecondRadioGroupItemLabel="Non-Teaching Staff"
					/>
					<FormContainer
						label="Position Applied"
						type="position_applied"
						name="position_applied"
					/>

					<SelectTag />

					<Note />

					{/* TODO: UPLOAD FILE */}
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							// Do something with the response
							console.log("Files: ", res);
							alert("Upload Completed");
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
