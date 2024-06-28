import {
	ApplicantForm,
	ApplicantStagesDate,
	applicantFormSchema,
	applicantStagesDateSchema,
} from "~/lib/zod";

export class Validator {
	static validateApplicantFormData(applicantFormData: ApplicantForm) {
		const validationResult = applicantFormSchema.safeParse(applicantFormData);
		console.log(validationResult);
		return validationResult;
	}

	static validateApplicantStagesDate(applicantFormStages: ApplicantStagesDate) {
		const validationResult = applicantStagesDateSchema.safeParse(applicantFormStages);
		console.log("Validator", validationResult);
		return validationResult;
	}
}
