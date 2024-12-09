"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "~/actions/actions";
import Previous from "~/components/pages/Previous";
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
import { TypographySmall } from "~/components/ui/typography-small";
import { toast } from "~/components/ui/use-toast";
import {
	getJobRequestByID,
	handleApproveJobRequest,
	handleDeclineJobRequest,
} from "~/controller/JobRequestController";
import { getUserByID } from "~/controller/UsersController";
import { JobRequestSelect, User } from "~/lib/schema";

type ConfirmationModalProps = {
	mainButton: React.ReactNode;
	descriptionButtonLabel: string;
	cancelButtonLabel: string;
	children: React.ReactNode;
	title: string;
};

function ConfirmationModal({
	mainButton,
	descriptionButtonLabel,
	cancelButtonLabel,
	children,
	title,
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
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>
							<div className="flex flex-col">
								{descriptionButtonLabel}
								<div>This action cannot be undone</div>
							</div>
						</AlertDialogDescription>
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

export default function ApprovalPage() {
	const { id: request_id } = useParams();
	const [job, setJob] = useState<JobRequestSelect>();
	const [user, setCurrentUser] = useState<User | null>();
	const [updatedByUser, setUpdatedByUser] = useState<User | null>();

	async function fetchCurrentUser() {
		const user = await getCurrentUser();
		setCurrentUser(user);
	}

	async function fetchApprovalbyId() {
		const job = await getJobRequestByID(Number(request_id));
		setJob(job);

		if (job?.updated_by) {
			const updatedByUser = await getUserByID(job.updated_by);
			setUpdatedByUser(updatedByUser);
		}
	}

	async function confirmApproval() {
		if (job && user) {
			const formData = new FormData();
			formData.append("request_id", job.request_id.toString());
			formData.append("job_status", "approved");
			formData.append("updated_by", user.id);

			await handleApproveJobRequest(formData);
			toast({
				title: "Job Approved",
				description: "The job request has been approved successfully.",
			});
		}
	}

	async function declineApproval() {
		if (job) {
			const formData = new FormData();
			formData.append("request_id", job.request_id.toString());
			formData.append("job_status", "denied");

			await handleDeclineJobRequest(formData);
			toast({
				title: "Job Declined",
				description: "The job request has been declined successfully.",
			});
		}
	}

	useEffect(() => {
		fetchApprovalbyId();
		fetchCurrentUser();
	}, []);

	return (
		<div className="mx-auto flex w-full flex-col gap-5 p-5">
			<Previous href="/dashboard/approvals" text="View all Job Requests" />
			<div className="bg-slate-200/30 px-10 py-10">
				<div className="container mx-auto px-10">
					<div className="my-5 h-[675px] rounded-lg border bg-white">
						<div className="flex h-[90%] flex-col items-center justify-center p-8">
							{/*border if ever */}
							<div className="flex h-full w-full">
								<div className="flex w-full items-center justify-center gap-8">
									<div className="flex h-full w-[50%] flex-col justify-center gap-8">
										<div className="flex flex-col">
											Requested Position
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_position}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Category
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_category
													? "Teaching Staff"
													: "Non-Teaching Staff"}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Department
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_department ?? "N/A"}
											</TypographySmall>
										</div>
									</div>
									<div className="flex h-full w-[50%] flex-col justify-center gap-8">
										<div className="flex flex-col">
											Qualification Standards: Educational Background
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="h-auto text-wrap font-medium shadow-md"
											>
												{job?.requested_qualification}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Type
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_type ? "Full-Time" : "Part-Time"}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Description
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="h-auto text-wrap font-medium shadow-md"
											>
												{job?.requested_description}
											</TypographySmall>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex w-full items-center justify-center">
							<div className="flex w-[90%] items-center justify-between">
								<div className="flex items-center justify-center font-bold">
									Requested By:{" "}
									<div className="bg-orange-100 p-1">
										{job?.requested_department}
										{job?.requested_department ? " | Department" : ""}
										{job?.requested_office}
										{job?.requested_office ? " | Office" : ""}
									</div>
								</div>
								<div className="flex items-center justify-center gap-2">
									Status:
									{job?.job_status === "approved" ||
									job?.job_status === "denied" ? (
										<div className="flex gap-2 bg-orange-100 p-1 font-semibold">
											<div
												className={
													job?.job_status === "approved"
														? "text-green-500"
														: "text-red-500"
												}
											>
												{job?.job_status === "approved"
													? "Approved"
													: "Rejected"}
											</div>
											by{" "}
											{updatedByUser?.firstName +
												" " +
												updatedByUser?.lastName +
												" | " +
												updatedByUser?.role}
										</div>
									) : (
										<div className="flex gap-2">
											<ConfirmationModal
												mainButton={
													<Button
														className="font-bold text-green-500"
														variant="outline"
													>
														Approve
													</Button>
												}
												descriptionButtonLabel="Are you sure you want to approve this job request?"
												cancelButtonLabel="No, cancel"
												title="Confirm Approval"
											>
												<AlertDialogAction
													className="w-full bg-red-900"
													onClick={confirmApproval}
												>
													Yes, confirm
												</AlertDialogAction>
											</ConfirmationModal>

											<ConfirmationModal
												mainButton={
													<Button
														className="font-bold text-red-500"
														variant="outline"
													>
														Decline
													</Button>
												}
												descriptionButtonLabel="Are you sure you want to reject this job request?"
												cancelButtonLabel="No, cancel"
												title="Confirm Rejection"
											>
												<AlertDialogAction
													className="w-full bg-red-900"
													onClick={declineApproval}
												>
													Yes, decline
												</AlertDialogAction>
											</ConfirmationModal>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
