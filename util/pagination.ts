export function calculateDisplayedRows(
	pageIndex: number,
	pageSize: number,
	totalRows: number
): number {
	return Math.min((pageIndex + 1) * pageSize, totalRows);
}
