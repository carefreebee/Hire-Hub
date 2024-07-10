import { RoleEnumsType } from "~/lib/schema";

export class DataExtractor {
	static extractApplicantStagesDate(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")),
			selected_date: formData.get("selected_date") as string,
		};
	}

	static extractApplicantScreeningAndInitialInterview(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")),
			assessed_by_id: formData.get("assessed_by_id") as string,
			assessed_by_name: formData.get("assessed_by_name") as string,
			assessed_by_role: formData.get("assessed_by_role") as RoleEnumsType,
			status: formData.get("applicant_status") as "passed" | "failed",
		};
	}

	static extractApplicantScreeningComment(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")) as number,
			commented_by: formData.get("evaluators_id") as string,
			comment: formData.get("comment") as string,
		};
	}

	static extractApplicantInitialInterview(formData: FormData) {
		const assessedByString = formData.get("assessed_by") as string;
		const assessedByArray = assessedByString.split(",").map((item) => item.trim());

		return {
			applicant_id: Number(formData.get("applicant_id")),
			selected_date: formData.get("selected_date") as string,
			selected_mode: formData.get("selected_mode") as "online" | "in-person",
			assessed_by: assessedByArray,
		};
	}

	static extractInitialInterviewForm(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")),
			user_id: formData.get("user_id") as string,
			rate: formData.get("rate") as string,
			recruitment_stage: formData.get("recruitment_stage") as string,
		};
	}
}
