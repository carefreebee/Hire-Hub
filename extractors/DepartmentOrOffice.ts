export class DataExtractor {
	static extractDepartmentOrOffice(formData: FormData) {
		return {
			selected_category: formData.get("selected_category") as
				| "teaching_staff"
				| "non-teaching_staff",
			department_name: formData.get("department_name") as string | null,
			office_name: formData.get("office_name") as string | null,
		};
	}
}