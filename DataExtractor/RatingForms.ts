export class DataExtractor {
    static extractRatingFormData(formData: FormData) {
        return {
			applicantId: Number(formData.get("applicant_id")),
			recruitment_stage: formData.get("recruitment_stage") as string,
			status: formData.get("status") as "passed" | "failed",
		};
    }
}