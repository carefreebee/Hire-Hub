import {
	ApplicantForm,
	ApplicantStagesDate,
	Comment,
	InitialInterviewForm,
	applicantFormSchema,
	applicantStagesDateSchema,
	applicantStagesInitialInterview,
	commentSchema,
	initialInterviewFormSchema,
} from "~/lib/zod";

export class Validator {
	static validateApplicantFormData(applicantFormData: ApplicantForm) {
		const validationResult = applicantFormSchema.safeParse(applicantFormData);
		console.log(validationResult);
		return validationResult;
	}

	// static validateApplicantStagesDate(applicantFormStages: ApplicantStagesDate) {
	// 	const validationResult = applicantStagesDateSchema.safeParse(applicantFormStages);
	// 	console.log("Validator", validationResult);
	// 	return validationResult;
	// }

	static validateApplicantStatusInitialInterview(applicantInitialInterview: ApplicantStagesDate) {
		const validationResult =
			applicantStagesInitialInterview.safeParse(applicantInitialInterview);
		console.log("Validator", validationResult);
		return validationResult;
	}

	// static validateComment(comment: Comment) {
	// 	const validationResult = commentSchema.safeParse(comment);
	// 	console.log(validationResult);
	// 	return validationResult;
	// }

	// static validateInitialInterviewForm(initialInterviewForm: InitialInterviewForm) {
	// 	const validationResult = initialInterviewFormSchema.safeParse(initialInterviewForm);
	// 	console.log(validationResult);
	// 	return validationResult;
	// }
}
