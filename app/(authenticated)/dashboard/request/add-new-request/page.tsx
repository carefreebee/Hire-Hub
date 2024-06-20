"use client";

import { ZodError } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { jobRequestSchema } from "~/lib/zod";
import { SelectTagProps } from "~/types/types";

function handleSubmitJobRequest(formData: FormData) {
	try {
		const JobRequestForm = {
			requested_position: formData.get("requested_position"),
			department: formData.get("department"),
			type: formData.get("type"),
			job_description: formData.get("job_description"),
			job_qualification: formData.get("job_qualification"),
		};

		const validatedData = jobRequestSchema.parse(JobRequestForm);
		console.log("Validated Job Request Form:", validatedData);
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMap = error.flatten().fieldErrors;
			const errorMessages = {
				requested_position: typeof errorMap["requested_position"],
				department: typeof errorMap["department"],
				type: typeof errorMap["type"],
				job_description: typeof errorMap["job_description"],
				job_qualification: typeof errorMap["job_qualification"],
			};
			console.log(errorMessages);
		}
	}
}

const AddNewRequestPage = () => {
	return (
		<section className="bg-slate-200/30">
			<form action={handleSubmitJobRequest} className="py-10">
				<div className="mx-auto flex h-[895px] w-[686px] flex-col justify-center gap-8 rounded-xl bg-white shadow-md">
					<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
						Personnel Request Form
					</h4>
					<div className="mx-auto w-[564px]">
						<LabelTag label="Requested Position" />
						<Input type="text" name="requested_position" className="border-2" />
					</div>
					<SelectTag
						name="department"
						label="Department"
						placeholder="Choose a department..."
					>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="teaching_staff">teaching_staff</SelectItem>
							<SelectItem value="non-teaching_staff">non-teaching_staff</SelectItem>
						</SelectGroup>
					</SelectTag>

					<SelectTag name="type" label="Type" placeholder="Select a type...">
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="teaching_staff">teaching_staff</SelectItem>
							<SelectItem value="non-teaching_staff">non-teaching_staff</SelectItem>
						</SelectGroup>
					</SelectTag>

					<div className="mx-auto grid w-[564px] gap-1.5">
						<LabelTag label="Description" />
						<Textarea
							name="job_description"
							placeholder="Add Job Description."
							className="border-2"
						/>
					</div>

					<div className="mx-auto grid w-[564px] gap-1.5">
						<LabelTag label="Qualification" />
						<Textarea
							name="job_qualification"
							placeholder="Add Job Qualification."
							className="border-2"
						/>
					</div>
					<div className="flex justify-center">
						<Button className="bg-[#7F0000] hover:scale-95 hover:bg-[#7F0000]">
							Submit Request Form
						</Button>
					</div>
				</div>
			</form>
		</section>
	);
};

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

function SelectTag({ label, name, placeholder, children }: SelectTagProps) {
	return (
		<div className="mx-auto flex h-[66px] w-[564px] flex-col gap-3">
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

export default AddNewRequestPage;
