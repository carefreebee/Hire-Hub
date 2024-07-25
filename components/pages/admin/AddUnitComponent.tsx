"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { createDepartment } from "~/Controller/DepartmentController";
import { createOffice } from "~/Controller/OfficeController";
import { CheckPathname } from "~/util/path";

type DepartmentFormProps = {
	headTitle: string;
	codeLabel: string;
	inputCode: string;
	fullLabel: string;
	inputName: string;
};

export default function AddUnitComponent({ headTitle, codeLabel, inputCode, fullLabel, inputName }: DepartmentFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const pathname = usePathname();
	const lastSegment = CheckPathname(pathname);
	console.log(lastSegment);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			if (lastSegment === "add-department") {
				await createDepartment(formData);
			} else if (lastSegment === "add-office") {
				await createOffice(formData);
			}
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: `${lastSegment === "add-department" ? "Department" : "Office"} Created!`,
				description: `${lastSegment === "add-department" ? "Department" : "Office"} has been successfully created.`,
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: `${lastSegment === "add-department" ? "Department" : "Office"} Error!`,
				description: `${lastSegment === "add-department" ? "Department" : "Office"} Error.`,
			});
		}
	}

	return (
		<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
			<div className="mx-auto flex h-96 w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-5 shadow-md">
				<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
					{headTitle}
				</h4>

				<div className="mx-auto w-[564px]">
					<Label className="font-semibold text-[#666666]">{codeLabel}</Label>
					<Input type="text" name={inputCode} className="border-2" />
				</div>

				<div className="mx-auto w-[564px]">
					<Label className="font-semibold text-[#666666]">{fullLabel}</Label>
					<Input type="text" name={inputName} className="border-2" />
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
