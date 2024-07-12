import { Column } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import SearchSvg from "~/components/ui/search-svg";

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
		<div className="flex">
			<Input
				placeholder={placeholder}
				value={(column.getFilterValue() as string) ?? ""}
				onChange={handleSearchChange}
				className={className}
			/>
			<SearchSvg />
		</div>
	);
}
