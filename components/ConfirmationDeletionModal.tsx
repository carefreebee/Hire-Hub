import {
	AlertDialog,
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
	mainButton: React.ReactNode;
	descriptionButtonLabel: string;
	cancelButtonLabel: string;
	children: React.ReactNode;
};

export function ConfirmationDeletionModal({
	mainButton,
	descriptionButtonLabel,
	cancelButtonLabel,
	children,
}: ConfirmationModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{mainButton}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="flex flex-row gap-5">
					<div className="bg-[#F5F5F5]">
						<Confirmation />
					</div>
					<div>
						<AlertDialogTitle>Confirm deletion</AlertDialogTitle>
						<AlertDialogDescription>{descriptionButtonLabel}</AlertDialogDescription>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex gap-4">
					<AlertDialogCancel className="w-full">{cancelButtonLabel}</AlertDialogCancel>
					{children}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
