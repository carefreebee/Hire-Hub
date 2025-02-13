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
import { FullTimeType, PartTimeType, SelectedPartTimeType } from "~/constant/constant";
import { formatDate } from "~/lib/date-time";
import { JobRequestSelect } from "~/lib/schema";

export const columns: ColumnDef<JobRequestSelect>[] = [
	{
		accessorKey: "request_id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Request ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="flex items-center justify-center gap-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "requested_position",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Position
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("requested_position")}
				</div>
			);
		},
	},
	{
		accessorKey: "requested_type",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const requestedType = row.getValue("requested_type");
			const isPartTimeOrFullTime =
				requestedType === SelectedPartTimeType ? PartTimeType : FullTimeType;
			return (
				<div className="flex items-center justify-center gap-2">{isPartTimeOrFullTime}</div>
			);
		},
	},
	{
		accessorKey: "requested_department",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Request Department
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("requested_department")}
					{row.getValue("requested_office")}
				</div>
			);
		},
	},
	{
		accessorKey: "requested_office",
		header: () => {
			return <div className="hidden p-0"></div>;
		},
		cell: () => {
			return <div className="hidden p-0"></div>;
		},
	},
	{
		accessorKey: "requested_date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Request Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date: Date = row.getValue("requested_date");
			return <div className="flex items-center justify-center gap-2">{formatDate(date)}</div>;
		},
	},
	{
		accessorKey: "Action",
		header: () => {
			return <p className="px-5">Action</p>;
		},
		cell: ({ row }) => {
			const id = row.getValue("request_id");

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
								<Link href={`/dashboard/request/view/${id}`}>View</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/dashboard/request/edit/${id}`}>Edit</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/dashboard/request/delete/${id}`}>Delete</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
