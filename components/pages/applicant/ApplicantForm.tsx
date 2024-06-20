"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { FormContainerProps, RadioGroupProps } from "~/types/types";

const ApplicantForm = () => {
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (formRef.current) {
			const formData = new FormData(formRef.current);
			const formObject: Record<string, any> = {};

			formData.forEach((value, key) => {
				formObject[key] = value;
			});

			// RADIO BUTTONS ARE NOT YET INCLUDED IN THE CONSOLE LOG
			console.log(formObject);
		}
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="space-y-8 text-[#344054]">
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
				</section>
			</section>
			<div className="flex items-center justify-center">
				<Button type="submit" className="bg-[#7F0000] hover:scale-95 hover:bg-[#5e1e1e]">
					Submit Application
				</Button>
			</div>
		</form>
	);
};

function FormContainer({ label, type, name, minLength, maxLength, inputMode }: FormContainerProps) {
	return (
		<div className="flex flex-col gap-3">
			<Label className="font-semibold">{label}</Label>
			<Input
				type={type}
				name={name}
				required
				minLength={minLength}
				maxLength={maxLength}
				inputMode={inputMode}
			/>
		</div>
	);
}

// RADIO BUTTONS ARE NOT YET INCLUDED IN THE CONSOLE LOG
function RadioGroupContainer({
	label,
	FirstRadioGroupItemValue,
	FirstRadioGroupItemLabel,
	SecondRadioGroupItemValue,
	SecondRadioGroupItemLabel,
}: RadioGroupProps) {
	return (
		<div className="h-[66px]">
			<Label className="font-semibold">{label}</Label>
			<div className="mt-3 font-semibold">
				<RadioGroup defaultValue="" className="flex">
					<div className="flex flex-1 items-center space-x-2">
						<RadioGroupItem value={FirstRadioGroupItemValue} id="r1" />
						<Label htmlFor="r1" className="font-semibold">
							{FirstRadioGroupItemLabel}
						</Label>
					</div>
					<div className="flex flex-1 items-center space-x-2">
						<RadioGroupItem value={SecondRadioGroupItemValue} id="r2" />
						<Label htmlFor="r2" className="font-semibold">
							{SecondRadioGroupItemLabel}
						</Label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}

function SelectTag() {
	return (
		<div className="flex h-[66px] flex-col gap-3">
			<Label className="font-semibold">
				Choose the college/ department you are applying for:
			</Label>
			<Select required>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Choose a department..." />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

function Note() {
	return (
		<div>
			<p className="text-sm font-semibold">
				Note: Click{" "}
				<Link href={"#"} className="text-[#7F0000]">
					here
				</Link>{" "}
				to download the application for employment form and fill-up the necessary
				information.
			</p>
			<p className="my-3 text-sm font-semibold">
				Attach the completed application form including your application letter
			</p>
		</div>
	);
}

export default ApplicantForm;
