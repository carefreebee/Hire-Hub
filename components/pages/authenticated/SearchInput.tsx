import { Column } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import SearchIcon from "~/components/ui/search-icon";

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
			<div className="relative flex items-center">
				<Input
					placeholder={placeholder}
					value={(column.getFilterValue() as string) ?? ""}
					onChange={handleSearchChange}
					className={className}
				/>
				<span className="absolute right-3 cursor-pointer">
					<SearchIcon />
				</span>
			</div>
		</div>
	);
}
