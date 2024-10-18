import {
	SelectCategory,
	SelectCivilStatus,
	SelectCommunicationMode,
	SelectExperience,
	SelectGender,
	SelectHighest,
} from "~/types/types";

export class DataExtractor {
	static extractApplicantFormData(formData: FormData) {
		return {
			first_name: formData.get("first_name") as string,
			last_name: formData.get("last_name") as string,
			email: formData.get("email") as string,
			gender: formData.get("genderType") as SelectGender,
			address: formData.get("address") as string,
			province: formData.get("province") as string,
			city: formData.get("city") as string,
			baranggay: formData.get("baranggay") as string,
			civil_stats: formData.get("civilStatus") as SelectCivilStatus,
			educational_attainment: formData.get("highestEducationalAttainment") as SelectHighest,
			degree: formData.get("degree") as string,
			job_experience: formData.get("jobExperience") as SelectExperience,
			skills: formData.get("skills") as string,
			contact_number: formData.get("contact_number") as string,
			communication_type: formData.get("communicationType") as SelectCommunicationMode,
			birthdate: formData.get("birth_date") as string,
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
