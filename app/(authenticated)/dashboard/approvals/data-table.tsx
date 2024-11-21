"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useState } from "react";
import TableHeaderComponent from "~/components/pages/authenticated/table/Header";
import TableFooter from "~/components/pages/authenticated/table/TableFooter";
import TableTopMostHeader from "~/components/pages/authenticated/table/TableTopMostHeader";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import useDataTable from "~/hooks/useCustom";
import { usePagination } from "~/hooks/usePagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [activeTab, setActiveTab] = useState("all");
	const table = useDataTable({ data, columns });
	const { pageIndex, totalFilteredRows, displayedRows } = usePagination(table);
	const changeJobStatus = table.getColumn("jobStatus");

	const filteredData = table.getRowModel().rows.filter((row) => {
		const jobStatus = row.getValue("job_status");
		if (activeTab === "all") return true;
		if (activeTab === "pending") return jobStatus === "pending";
		if (activeTab === "approved") return jobStatus === "approved";
		if (activeTab === "rejected") return jobStatus === "denied";
		return false;
	});

	return (
		<div>
			<div className="flex items-center justify-between py-4">
				<TableTopMostHeader title="Total Job Request" data={data.length} />
				<Tabs
					defaultValue="all"
					className="w-[400px] rounded-sm shadow-sm"
					onValueChange={setActiveTab}
				>
					<TabsList>
						<TabsTrigger value="all">All Request</TabsTrigger>
						<TabsTrigger value="pending">Pending</TabsTrigger>
						<TabsTrigger value="approved">Approved</TabsTrigger>
						<TabsTrigger value="rejected">Rejected</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className="my-5 h-[616px] rounded-lg border bg-white">
				<Table>
					<TableHeader className="mb-5">
						<TableHeaderComponent headerGroups={table.getHeaderGroups()} />
					</TableHeader>
					<TableBody>
						{filteredData.length ? (
							filteredData.map((row) => (
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
			<TableFooter
				table={table}
				pageIndex={pageIndex}
				totalFilteredRows={totalFilteredRows}
				displayedRows={displayedRows}
			/>
		</div>
	);
}
