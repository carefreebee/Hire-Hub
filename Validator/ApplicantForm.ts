import { ApplicantForm, applicantFormSchema } from "~/lib/zod";

export class Validator {
	static validateApplicantFormData(applicantFormData: ApplicantForm) {
		const validationResult = applicantFormSchema.safeParse(applicantFormData);
		console.log(validationResult);
		return validationResult;
	}
}
