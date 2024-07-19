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
			department_id: Number(formData.get("department_id")),
			selected_department: formData.get("selected_department") as string,
			office_id: Number(formData.get("office_id")),
			selected_office: formData.get("selected_office") as string,
			// resume: formData.getAll("resume") as string[],
			resume_name: formData.get("resume_name") as string,
			resume_url: formData.get("resume_url") as string,
			letter_name: formData.get("letter_name") as string,
			letter_url: formData.get("letter_url") as string,
		};
	}

	static extractApplicantStagesStatus(formData: FormData) {
		return {
			applicantId: Number(formData.get("applicant_id")),
			status: formData.get("applicant_status") as "passed" | "failed",
		};
	}
}
