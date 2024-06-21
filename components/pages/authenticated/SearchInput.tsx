import { Column } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";

interface SearchInputProps {
	placeholder: string;
	column: Column<any, any>;
	className?: string;
}

export function SearchInput({ placeholder, column, className }: SearchInputProps) {
	function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		column.setFilterValue(value);
	}

	return (
		<Input
			placeholder={placeholder}
			value={(column.getFilterValue() as string) ?? ""}
			onChange={handleSearchChange}
			className={className}
		/>
	);
}
