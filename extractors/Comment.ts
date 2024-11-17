export class DataExtractor {
	static extractApplicantScreeningComment(formData: FormData) {
		return {
			applicant_id: Number(formData.get("applicant_id")) as number,
			commented_by: formData.get("evaluators_id") as string,
			comment: formData.get("comment") as string,
		};
	}
}
