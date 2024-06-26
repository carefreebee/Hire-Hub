"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import Confirmation from "~/components/ui/confirmation";
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
import { handleUpdateUserRole } from "~/controller/UsersController";
import { roleEnums } from "~/lib/schema";

type ApplicantFormProps = {
	id: string;
	requestedDepartment: string[];
	requestedOffice: string[];
};

export default function UpdateInput({
	id,
	requestedDepartment,
	requestedOffice,
}: ApplicantFormProps) {
	const [selectedPosition, setSelectedPosition] = useState<
		"teaching_staff" | "non-teaching_staff"
	>();
	const formRef = useRef<HTMLFormElement>(null);

	// Extract the role enums from the schema
	const roleEnum = roleEnums.enumValues;

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await handleUpdateUserRole(formData);
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
			className="flex w-full flex-col gap-1.5"
		>
			<div className="flex items-center">
				<input type="hidden" name="id" value={id} readOnly />
				<Label className="w-52">Position</Label>
				<Select name="selected_position">
					<SelectTrigger>
						<SelectValue placeholder="Select a position" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Positions</SelectLabel>
							{roleEnum.map((role) => (
								<SelectItem key={role} value={role}>
									{role.replaceAll("_", " ").toLowerCase()}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="flex h-[40px] items-center">
				<Label className="w-52">Select option</Label>
				<div className="w-full">
					<RadioGroup
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSelectedPosition(
								e.target.value as "teaching_staff" | "non-teaching_staff"
							)
						}
						name="selected_option"
						className="flex gap-10"
					>
						<div className="ml-auto flex items-center space-x-2">
							<RadioGroupItem value="teaching_staff" id="r1" />
							<Label htmlFor="r1">Teaching Staff</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="non-teaching_staff" id="r2" />
							<Label htmlFor="r2">Non-Teaching Staff</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div className="flex items-center">
				{selectedPosition === "teaching_staff" ? (
					<>
						<Label className="w-52">Department</Label>
						<Select name="selected_department" required>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Choose a department..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Select department</SelectLabel>
									{requestedDepartment.map((department, index) => (
										<SelectItem key={index} value={department}>
											{department}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
				) : selectedPosition === "non-teaching_staff" ? (
					<>
						<Label className="w-52">Office</Label>
						<Select name="selected_office" required>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Choose an office..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Select office</SelectLabel>
									{requestedOffice.map((office, index) => (
										<SelectItem key={index} value={office}>
											{office}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
				) : (
					<>
						<Label className="w-52">Department/Office</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Choose a position..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Please select first a position</SelectLabel>
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
				)}
			</div>
			{/* MUST USE THE CONFIRMATION MODAL ALREADY DONE FOR A FLEXIBLE CONFIRMATION POP UP */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						type="submit"
						className="mb-10 ml-auto mt-20 w-32 bg-[#7F0000] hover:bg-[#7F0000]"
					>
						Update Role
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader className="flex flex-row gap-5">
						<div className="bg-[rgb(245,245,245)]">
							<Confirmation />
						</div>
						<div>
							<AlertDialogTitle>Confirm submit form</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to submit the form?
							</AlertDialogDescription>
						</div>
					</AlertDialogHeader>
					<AlertDialogFooter className="flex gap-4">
						<AlertDialogCancel className="w-full">No, cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleSubmit}
							className="w-full bg-[#7F0000] hover:bg-[#7F0000]"
						>
							Yes, confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</form>
	);
}
