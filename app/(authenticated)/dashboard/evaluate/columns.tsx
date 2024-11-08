"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

import { formatDate } from "~/lib/date-time";
import { ApplicantSelect } from "~/lib/schema";
import IDColumn from "./id-column";

export const columns: ColumnDef<ApplicantSelect>[] = [
	{
		accessorKey: "id",
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
				<div className="flex items-center justify-center gap-2">{row.getValue("id")}</div>
				// return <div className="flex items-center justify-center gap-2">{row.index + 1}</div>;
			);
		},
	},
	{
		accessorKey: "first_name",
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
					{row.getValue("first_name")} {row.getValue("last_name")}
				</div>
			);
		},
	},
	{
		accessorKey: "last_name",
		header: () => {
			return <div className="hidden p-0"></div>;
		},
		cell: () => {
			return <div className="hidden p-0"></div>;
		},
	},
	{
		accessorKey: "position_applied",
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
					{row.getValue("position_applied")}
				</div>
			);
		},
	},
	{
		accessorKey: "selected_department",
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
					{row.getValue("selected_department")}
					{row.getValue("selected_office")}
				</div>
			);
		},
	},
	{
		accessorKey: "selected_office",
		header: () => {
			return <div className="hidden"></div>;
		},
		cell: () => {
			return <div className="hidden"></div>;
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
			const date: Date = row.getValue("applied_date");
			return <div className="flex items-center justify-center gap-2">{formatDate(date)}</div>;
		},
	},
	{
		id: "actions",
		accessorKey: "Action",
		header: () => {
			return <div className="px-5">Action</div>;
		},
		cell: ({ row }) => {
			const id: number = row.getValue("id");
			return (
				<div className="flex items-center justify-center">
					<IDColumn id={id} />
				</div>
			);
		},
	},
];