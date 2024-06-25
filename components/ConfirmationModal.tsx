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
import Confirmation from "./ui/confirmation";

type ConfirmationModalProps = {
	children: React.ReactNode;
};

export function ConfirmationModal({ children }: ConfirmationModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="flex flex-row gap-5">
					<div className="bg-[#F5F5F5]">
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
					<AlertDialogAction className="w-full bg-[#7F0000] hover:bg-[#7F0000]">
						Yes, confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
