import { RoleEnumsType } from "~/lib/schema";
import { UserRoleData } from "~/Validator/Users";

export class DataExtractor {
	static extractUserRole(formData: FormData): UserRoleData {
		return {
			selected_position: formData.get("selected_position") as RoleEnumsType,
			selected_option: formData.get("selected_option") as
				| "teaching_staff"
				| "non-teaching_staff",
			selected_department: formData.get("selected_department") as string | null,
			selected_office: formData.get("selected_office") as string | null,
		};
	}
}
