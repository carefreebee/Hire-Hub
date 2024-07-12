"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import Link from "next/link";
import { SearchInput } from "~/components/pages/authenticated/SearchInput";
import TableHeaderComponent from "~/components/pages/authenticated/table/Header";
import TableFooter from "~/components/pages/authenticated/table/TableFooter";
import TableTopMostHeader from "~/components/pages/authenticated/table/TableTopMostHeader";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "~/components/ui/table";
import useDataTable from "~/hooks/useCustom";
import { usePagination } from "~/hooks/usePagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useDataTable({ data, columns });
	const { pageIndex, totalFilteredRows, displayedRows } = usePagination(table);
	const searchDepartmentOrOffice = table.getColumn("requested_department");

	return (
		<div>
			<div className="flex items-center justify-between py-4">
				<TableTopMostHeader title="Total Job Request" data={data.length} />
				<Link
					href={"/dashboard/request/add-job-request"}
					className="rounded-lg bg-[#7F0000] px-3.5 py-1.5 text-white hover:scale-95"
				>
					+ Add Job Request
				</Link>
				<SearchInput
					placeholder="Search..."
					column={searchDepartmentOrOffice!}
					className="w-[299px]"
				/>
			</div>
			<div className="my-5 h-[616px] rounded-lg border bg-white">
				<Table>
					<TableHeader className="mb-5">
						<TableHeaderComponent headerGroups={table.getHeaderGroups()} />
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
			<TableFooter
				table={table}
				pageIndex={pageIndex}
				totalFilteredRows={totalFilteredRows}
				displayedRows={displayedRows}
			/>
		</div>
	);
}
