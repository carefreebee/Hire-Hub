import { RoleEnumsType, applicant } from "~/lib/schema";
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

	// static extractApplicantStagesDate(formData: FormData) {
	// 	return {
	// 		applicant_id: Number(formData.get("applicant_id")),
	// 		selected_date: formData.get("selected_date") as string,
	// 	};
	// }

	static extractApplicantStagesStatus(formData: FormData) {
		return {
			applicantId: Number(formData.get("applicant_id")),
			status: formData.get("applicant_status") as "passed" | "failed",
		};
	}

	// static extractApplicantInitialInterview(formData: FormData) {
	// 	const assessedByString = formData.get("assessed_by") as string;
	// 	const assessedByArray = assessedByString.split(",") as RoleEnumsType[];

	// 	return {
	// 		applicant_id: Number(formData.get("applicant_id")),
	// 		selected_date: formData.get("selected_date") as string,
	// 		selected_mode: formData.get("selected_mode") as "online" | "in-person",
	// 		assessed_by: assessedByArray,
	// 	};
	// }

	// static extractApplicantScreeningComment(formData: FormData) {
	// 	return {
	// 		applicant_id: Number(formData.get("applicant_id")) as number,
	// 		commented_by: formData.get("evaluators_id") as string,
	// 		comment: formData.get("comment") as string,
	// 	};
	// }

	// static extractApplicantInitialInterviewForm(formData: FormData) {
	// 	return {
	// 		applicant_id: Number(formData.get("applicant_id")),
	// 		user_id: formData.get("user_id") as string,
	// 		rate: formData.get("rate") as string,
	// 		recruitment_stage: formData.get("recruitment_stage") as string,
	// 	};
	// }
}
