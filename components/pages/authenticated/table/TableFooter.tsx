import PaginationButton from "~/components/pages/authenticated/PaginationButton";
import DisplayRowsAndFilteredRows from "~/components/pages/authenticated/table/DisplayRowsAndFilteredRows";
import { Button } from "~/components/ui/button";

interface TableFooterProps {
	table: any;
	pageIndex: number;
	totalFilteredRows: number;
	displayedRows: number;
}

export default function TableFooter({
	table,
	pageIndex,
	totalFilteredRows,
	displayedRows,
}: TableFooterProps) {
	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<DisplayRowsAndFilteredRows
				displayedRows={displayedRows}
				totalFilteredRows={totalFilteredRows}
			/>
			<PaginationButton
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
				text="Previous"
			/>
			{table.getPageOptions().map((page: number) => {
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
			<PaginationButton
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
				text="Next"
			/>
		</div>
	);
}
