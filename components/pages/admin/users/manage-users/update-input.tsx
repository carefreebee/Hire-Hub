"use client";

import Link from "next/link";
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
import { toast } from "~/components/ui/use-toast";
import { UpdateUserRole } from "~/Controller/UsersController";
import { DepartmentSelect, OfficeSelect, roleEnums, RoleEnumsType } from "~/lib/schema";
import { rolesWithoutDeptAndOffice } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";

type ApplicantFormProps = {
	id: string;
	department: DepartmentSelect[];
	office: OfficeSelect[];
};

export default function UpdateInput({ id, department, office }: ApplicantFormProps) {
	const [selectedOption, setSelectedOption] = useState<"teaching_staff" | "non-teaching_staff">();
	const formRef = useRef<HTMLFormElement>(null);

	// Extract the role enums from the schema
	const roleEnum = roleEnums.enumValues;

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await UpdateUserRole(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "User role updated successfully",
				description: "User role updated successfully.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "User role updated failed",
				description: "User role updated failed.",
			});
		}
	}

	const [selectedRoleWithoutDeptOrOffice, setSelectedRoleWithoutDeptOrOffice] = useState<
		RoleEnumsType | null | string
	>(null);
	function handleSelectChange(role: RoleEnumsType) {
		if (rolesWithoutDeptAndOffice.includes(role)) {
			setSelectedRoleWithoutDeptOrOffice(role);
		} else {
			setSelectedRoleWithoutDeptOrOffice(null);
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
				<Select
					name="selected_position"
					onValueChange={(role: RoleEnumsType) => handleSelectChange(role)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a position" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Positions</SelectLabel>
							{roleEnum.map((role, index) => (
								<SelectItem key={index} value={role}>
									{formattedNameAndRole(role, "_")}
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
						disabled={selectedRoleWithoutDeptOrOffice !== null}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSelectedOption(
								e.target.value as "teaching_staff" | "non-teaching_staff"
							)
						}
						name="selected_option"
						className="flex gap-10"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="teaching_staff" id="r1" />
							<Label htmlFor="r1">Department</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="non-teaching_staff" id="r2" />
							<Label htmlFor="r2">Office</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div className="flex items-center">
				{selectedOption === "teaching_staff" ? (
					<>
						<Label className="w-52">Department</Label>
						<Select name="selected_department" required>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Choose a department..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Select department</SelectLabel>
									{department.map((department) => (
										<SelectItem
											key={department.department_id}
											value={department.department_name}
										>
											{department.department_name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
				) : selectedOption === "non-teaching_staff" ? (
					<>
						<Label className="w-52">Office</Label>
						<Select name="selected_office" required>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Choose an office..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Select office</SelectLabel>
									{office.map((office) => (
										<SelectItem
											key={office.office_id}
											value={office.office_name}
										>
											{office.office_name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
				) : (
					<>
						<Label className="w-52">Department/Office</Label>
						<Select disabled={selectedRoleWithoutDeptOrOffice !== null}>
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
							<Link href={"/admin/users/manage-users"}>Yes, confirm</Link>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{/* <ConfirmationModal
				mainButton={
					<Button
						type="submit"
						className="mb-10 ml-auto mt-20 w-32 bg-[#7F0000] hover:bg-[#7F0000]"
					>
						Update Role
					</Button>
				}
				descriptionButtonLabel="Are you sure you want to submit the form?"
				cancelButtonLabel="No, cancel"
			>
				<AlertDialogAction
					onClick={handleSubmit}
					className="w-full bg-[#7F0000] hover:bg-[#7F0000]"
				>
					<Link href={"/admin/users/manage-users"}>Yes, confirm</Link>
				</AlertDialogAction>
			</ConfirmationModal> */}
		</form>
	);
}
