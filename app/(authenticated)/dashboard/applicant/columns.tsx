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
import ProfileSVG from "~/components/ui/profile-svg";

// columns.tsx (client component) will contain our column definitions.
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FakeApplicantData = {
	applicant_id: string;
	applicant_name: string;
	position: string;
	department: string;
	status:
		| "Screening"
		| "Initial Interview"
		| "Teaching Demo"
		| "Psychological Exam"
		| "Panel Interview"
		| "Recommendation for Hiring";
	applied_date: string;
};

export const columns: ColumnDef<FakeApplicantData>[] = [
	{
		accessorKey: "applicant_id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Applicant ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("applicant_id")}
				</div>
			);
		},
	},
	{
		accessorKey: "applicant_name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					<ProfileSVG />
					{row.getValue("applicant_name")}
				</div>
			);
		},
	},
	{
		accessorKey: "position",
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
					{row.getValue("position")}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Applicant Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("status")}
				</div>
			);
		},
	},
	{
		accessorKey: "department",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Department
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("department")}
				</div>
			);
		},
	},
	{
		accessorKey: "applied_date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Applied Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("applied_date")}
				</div>
			);
		},
	},
	{
		id: "actions",
		accessorKey: "Action",
		cell: ({ row }) => {
			const id = row.original.applicant_id;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="center" className="rounded-xl">
						<DropdownMenuItem>
							<Link href={`/dashboard/applicant/${id}`}>View</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-[#EC3838]">Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
