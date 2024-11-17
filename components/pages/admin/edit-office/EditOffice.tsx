"use client";

import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { updateOffice } from "~/controller/OfficeController";

type EditResultProps = {
	unitId: string;
	unitCode: string;
	unitName: string;
};

export default function EditOffice({ unitId, unitCode, unitName }: EditResultProps) {
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		try {
			await updateOffice(formData);
			// Reset the form after successful submission
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Office Updated!",
				description: "Office has been successfully updated.",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<form
			ref={formRef}
			onSubmit={(e) => e.preventDefault()}
			className="mx-auto flex h-96 w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-5 shadow-md"
		>
			<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
				Edit Office
			</h4>

			<input type="hidden" name="office_id" value={unitId} readOnly />

			<div className="mx-auto w-[564px]">
				<Label className="font-semibold text-[#666666]">Office Code</Label>
				<Input
					type="text"
					name="office_code"
					value={unitCode}
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<Label className="font-semibold text-[#666666]">Office Name</Label>
				<Input
					type="text"
					name="office_name"
					defaultValue={unitName}
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
							Udpate Office
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
