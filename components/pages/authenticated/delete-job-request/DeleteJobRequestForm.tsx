"use client";

import { useRouter } from "next/navigation";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { handleDeleteJobRequest } from "~/Controller/JobRequestController";
import { JobRequestSelect } from "~/lib/schema";
import { formattedNameAndRole } from "~/util/formatted-name";

type DeleteJobrequestFormProps = {
	jobRequestByID: JobRequestSelect;
	id: number;
};

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

export default function DeleteJobrequestForm({ jobRequestByID, id }: DeleteJobrequestFormProps) {
	const router = useRouter();

	async function handleDelete(): Promise<void> {
		await handleDeleteJobRequest(id);

		router.push("/dashboard/request");
		toast({
			title: "Deleted Successfully.",
			description: "Job Request has been deleted successfully.",
		});
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="mx-auto flex w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-10 shadow-md"
		>
			<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
				Delete Request Details
			</h4>
			<input type="hidden" name="request_id" value={id} readOnly />
			<div className="mx-auto w-[564px]">
				<LabelTag label="Requested Position" />
				<Input
					value={jobRequestByID?.requested_position}
					name="requested_position"
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag label="Category" />
				<Input
					value={
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? TeachingStaff
							: NonTeachingStaff
					}
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag
					label={
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? "Department"
							: "Office"
					}
				/>
				<Input
					value={
						jobRequestByID?.requested_department || jobRequestByID?.requested_office!
					}
					name={`${
						jobRequestByID?.requested_category === SelectedCategoryTeachingStaff
							? "requested_department"
							: "requested_office"
					}`}
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto w-[564px]">
				<LabelTag label="Type" />
				<Input value={formattedNameAndRole(jobRequestByID.requested_type, "_")} readOnly />
			</div>

			<div className="mx-auto grid w-[564px] gap-1.5">
				<LabelTag label="Description" />
				<Textarea
					value={jobRequestByID?.requested_description}
					name="requested_description"
					readOnly
					className="border-2"
				/>
			</div>

			<div className="mx-auto grid w-[564px] gap-1.5">
				<LabelTag label="Qualification" />
				<Textarea
					value={jobRequestByID?.requested_qualification}
					name="requested_qualification"
					readOnly
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
							Delete Request Form
						</Button>
					}
					descriptionButtonLabel="Are you sure you want to delete the form?"
					cancelButtonLabel="No, cancel"
				>
					<AlertDialogAction className="w-full" onClick={handleDelete}>
						Yes, Delete
					</AlertDialogAction>
				</ConfirmationModal>
			</div>
		</form>
	);
}
