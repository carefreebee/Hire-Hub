import { Table } from "@tanstack/react-table";
import { calculateDisplayedRows } from "~/util/pagination";

interface PaginationState {
	pageIndex: number;
	pageSize: number;
	totalFilteredRows: number;
	displayedRows: number;
}

export function usePagination<TData>(table: Table<TData>): PaginationState {
	const { pageIndex, pageSize } = table.getState().pagination;
	const totalFilteredRows = table.getFilteredRowModel().rows.length;
	const displayedRows = calculateDisplayedRows(pageIndex, pageSize, totalFilteredRows);

	return {
		pageIndex,
		pageSize,
		totalFilteredRows,
		displayedRows,
	};
}
