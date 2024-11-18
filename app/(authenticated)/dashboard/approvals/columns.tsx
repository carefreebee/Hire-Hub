"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

import { formatDate } from "~/lib/date-time";
import { JobRequestSelect } from "~/lib/schema";
import IDColumn from "./id-column";

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
			return (
				<div className="flex items-center justify-center gap-2">
					{row.getValue("request_id")}
				</div>
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
		accessorKey: "requested_department",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Department/Office
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
			return <div className="hidden"></div>;
		},
		cell: () => {
			return <div className="hidden"></div>;
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
		id: "actions",
		accessorKey: "Action",
		header: () => {
			return <div className="px-5">Action</div>;
		},
		cell: ({ row }) => {
			const id: number = row.getValue("request_id");
			return (
				<div className="flex items-center justify-center">
					<IDColumn id={id} />
				</div>
			);
		},
	},
];
