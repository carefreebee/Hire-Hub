export class DataExtractor {
	static extractApplicantStagesForm(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")),
			user_id: formData.get("user_id") as string,
			rate: formData.get("rate") as string,
			recruitment_stage: formData.get("recruitment_stage") as string,
		};
	}
}