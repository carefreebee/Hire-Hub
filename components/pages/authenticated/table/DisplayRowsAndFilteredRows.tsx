type DisplayRowsAndFilteredRowsProps = {
	displayedRows: number;
	totalFilteredRows: number;
};

export default function DisplayRowsAndFilteredRows({
	displayedRows,
	totalFilteredRows,
}: DisplayRowsAndFilteredRowsProps) {
	return (
		<div className="flex-1 text-sm text-muted-foreground">
			Showing {displayedRows} of {totalFilteredRows}
		</div>
	);
}
