"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "~/components/ui/use-toast";
import { deleteOffice } from "~/Controller/OfficeController";
import { OfficeSelect } from "~/lib/schema";

export const columns: ColumnDef<OfficeSelect>[] = [
	{
		accessorKey: "office_id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Office ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("office_id")}
				</div>
			);
		},
	},
	{
		accessorKey: "office_name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Office Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("office_name")}
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
			const id = row.getValue("office_id");

			return (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center" className="rounded-xl">
							<DropdownMenuItem asChild>
								<Link href={`/admin/units/office/view/${id}`}>View</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/admin/units/office/edit/${id}`}>Edit</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									onClick={async () => {
										await deleteOffice(Number(id));
										toast({
											title: "Deleted Office",
											description: "Office has been deleted successfully",
										});
									}}
									variant={"ghost"}
									className="h-auto p-0 text-[#EC3838] hover:text-[#EC3838]"
								>
									Delete
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
