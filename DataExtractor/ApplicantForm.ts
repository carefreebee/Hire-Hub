import { SelectCategory, SelectCommunicationMode } from "~/types/types";

export class DataExtractor {
	static extractApplicantFormData(formData: FormData) {
		return {
			first_name: formData.get("first_name") as string,
			last_name: formData.get("last_name") as string,
			email: formData.get("email") as string,
			contact_number: formData.get("contact_number") as string,
			communication_type: formData.get("communication_type") as SelectCommunicationMode,
			positionType: formData.get("positionType") as SelectCategory,
			position_applied: formData.get("position_applied") as string,
			selected_department: formData.get("selected_department") as string,
			selected_office: formData.get("selected_office") as string,
			resume: formData.get("resume") as string,
		};
	}
}
