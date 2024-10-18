"use client";

import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ConfirmationDeletionModal } from "~/components/ConfirmationDeletionModal";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { deleteDepartmentByCode } from "~/controller/DepartmentController";
import { handleDeleteJobRequest } from "~/controller/JobRequestController";
import { DepartmentSelect } from "~/lib/schema";

export const columns: ColumnDef<DepartmentSelect>[] = [
	{
		accessorKey: "department_code",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Department ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("department_code")}
				</div>
			);
		},
	},
	{
		accessorKey: "department_name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Department Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("department_name")}
				</div>
			);
		},
	},
	{
		accessorKey: "Action",
		header: () => {
			return <p className="px-5">Action</p>;
		},
		cell: ({ row }) => {
			const departmentCode: string = row.getValue("department_code");

			const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault;
				deleteDepartmentByCode(departmentCode);
			};

			return (
				<div className="flex items-center justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center" className="rounded-xl">
							<DropdownMenuItem asChild>
								<Link href={`/admin/units/department/view/${departmentCode}`}>
									View
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/admin/units/department/edit/${departmentCode}`}>
									Edit
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<ConfirmationDeletionModal
									mainButton={
										<Button
											type="button"
											className="w-full bg-transparent text-red-600 hover:bg-[#f1f5f9]"
										>
											Delete
										</Button>
									}
									descriptionButtonLabel="Are you sure you want to delete this department?"
									cancelButtonLabel="No, cancel"
								>
									<AlertDialogAction
										className="w-full"
										onClick={handleClickDelete}
									>
										Delete
									</AlertDialogAction>
								</ConfirmationDeletionModal>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
