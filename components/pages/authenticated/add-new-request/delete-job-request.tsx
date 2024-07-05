"use client";

// import { MoreHorizontal } from "lucide-react";
// import Link from "next/link";
// import { useRef } from "react";
// import { ConfirmationModal } from "~/components/ConfirmationModal";
// import { AlertDialogAction } from "~/components/ui/alert-dialog";
// import { Button } from "~/components/ui/button";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu";
// import { toast } from "~/components/ui/use-toast";
// import { handleDeleteJobRequest } from "~/controller/JobRequestController";

export default function DeleteJobRequest({ id }: { id: number }) {
	// const formRef = useRef<HTMLFormElement>(null);

	// async function handleSubmit(): Promise<void> {
	// 	const formData = new FormData(formRef.current!);
	// 	try {
	// 		await handleDeleteJobRequest(formData);
	// 		// Reset the form after successful submission
	// 		if (formRef.current) {
	// 			formRef.current.reset();
	// 		}
	// 		toast({
	// 			title: "Deleted Successfully.",
	// 			description: "Job Request has been deleted successfully.",
	// 		});
	// 	} catch (error) {
	// 		console.error("Error submitting form:", error);
	// 	}
	// }

	return (
		<>
			If you want to use this component there is a bug where when you open the dropdown and
			click delete for confirmation pop up it will show for like 1 sec or something it is due
			to the fact that dropdown itself has a closing tab something that will make the
			confirmation popup conflicts like if the `delete button` was clicked while the dropdown
			was shown well it will of course show the confirmation but at the same time the dropdown
			will also close and if the dropdown closes the confirmation will also close. *Remember
			this is BASED on my assumption
		*</>
		// <div className="flex justify-center">
		// 	<DropdownMenu>
		// 		<DropdownMenuTrigger asChild>
		// 			<Button type="button" variant="ghost" className="h-8 w-8 p-0">
		// 				<span className="sr-only">Open menu</span>
		// 				<MoreHorizontal className="h-4 w-4" />
		// 			</Button>
		// 		</DropdownMenuTrigger>
		// 		<DropdownMenuContent align="center" className="rounded-xl">
		// 			<DropdownMenuItem asChild>
		// 				<Link href={`/dashboard/request/result/${id}`}>View</Link>
		// 			</DropdownMenuItem>
		// 			<DropdownMenuSeparator />
		// 			<DropdownMenuItem asChild>
		// 				<Link href={`/dashboard/request/edit/${id}`}>Edit</Link>
		// 			</DropdownMenuItem>
		// 			<DropdownMenuSeparator />
		// 			<DropdownMenuItem>
		// 				<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
		// 					<input type="hidden" name="request_id" value={id} readOnly />
		// 					<ConfirmationModal
		// 						mainButton={
		// 							<Button
		// 								type="button"
		// 								variant={"ghost"}
		// 								className="h-auto p-0 text-[#EC3838] hover:text-[#EC3838]"
		// 							>
		// 								Delete
		// 							</Button>
		// 						}
		// 						descriptionButtonLabel="Are you sure you want to deelete the Job Request?"
		// 						cancelButtonLabel="No, cancel"
		// 					>
		// 						<AlertDialogAction className="w-full" onClick={handleSubmit}>
		// 							Yes, submit
		// 						</AlertDialogAction>
		// 					</ConfirmationModal>
		// 				</form>
		// 			</DropdownMenuItem>
		// 		</DropdownMenuContent>
		// 	</DropdownMenu>
		// </div>
	);
}
