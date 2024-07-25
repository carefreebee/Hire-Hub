type YearPickerProps = {
	selectedYear: number | undefined;
	onYearSelect: (year: number) => void;
};

const years = Array.from({ length: 100 }, (_, i) => 2024 + i);

export function YearPicker({ selectedYear, onYearSelect }: YearPickerProps) {
	return (
		<select
			value={selectedYear ?? ""}
			onChange={(e) => onYearSelect(Number(e.target.value))}
			className="w-20 p-2"
		>
			<option value="" disabled>
				Select a year
			</option>
			{years.map((year) => (
				<option key={year} value={year}>
					{year}
				</option>
			))}
		</select>
	);
}