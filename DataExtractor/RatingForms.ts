export class DataExtractor {
    static extractRatingFormData(formData: FormData) {
        return {
			applicantId: Number(formData.get("applicant_id")),
			status: formData.get("status") as "passed" | "failed",
		};
    }
}