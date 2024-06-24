import { useState } from "react";
import { SelectCategory } from "~/types/types";

export function useSelectedCategoryOptions() {
	const [selectedCategory, setSelectedCategory] = useState<SelectCategory>();

	function handleChangeCategory(value: SelectCategory) {
		setSelectedCategory(value);
	}

	return { selectedCategory, handleChangeCategory };
}
