"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

function calculateDisplayedRows(pageIndex: number, pageSize: number, totalRows: number): number {
	return Math.min((pageIndex + 1) * pageSize, totalRows);
}

// data-table.tsx (client component) will contain our <DataTable /> component.
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	const { pageIndex, pageSize } = table.getState().pagination;
	const totalFilteredRows = table.getFilteredRowModel().rows.length;
	const displayedRows = calculateDisplayedRows(pageIndex, pageSize, totalFilteredRows);

	function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		table.getColumn("applicant_name")?.setFilterValue(value);
	}

	return (
		<div>
			<div className="flex items-center justify-between py-4">
				<div className="flex items-center gap-5 font-medium">
					<p className="text-base text-muted-foreground">Total Job Request</p>
					<p className="rounded-md bg-[#7F0000] px-1.5 py-1 text-white">{30}</p>
				</div>
				<Link
					href={"/dashboard/request/add-new-request"}
					className="rounded-lg bg-[#7F0000] px-3.5 py-1.5 text-white hover:scale-95"
				>
					+Add New Request
				</Link>
				<Input
					placeholder="Search..."
					value={(table.getColumn("applicant_name")?.getFilterValue() as string) ?? ""}
					onChange={handleSearchChange}
					className="w-[299px]"
				/>
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Columns</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu> */}
			</div>
			<div className="my-5 rounded-lg border bg-white">
				<Table>
					<TableHeader className="mb-5">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					Showing {displayedRows} of {totalFilteredRows}
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				{table.getPageOptions().map((page) => {
					const isCurrentPage = page === pageIndex;

					return (
						<Button
							key={page}
							onClick={() => table.setPageIndex(page)}
							className={`${isCurrentPage ? "bg-[#7F0000] hover:bg-[#7F0000]" : "bg-white text-black hover:bg-[#7F0000] hover:text-white"}`}
						>
							{page + 1}
						</Button>
					);
				})}
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
