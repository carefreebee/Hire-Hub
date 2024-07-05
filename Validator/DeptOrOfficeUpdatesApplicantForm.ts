import { InitialInterviewForm, initialInterviewFormSchema } from "~/lib/zod";

export class Validator {
	static validateInitialInterviewForm(initialInterviewForm: InitialInterviewForm) {
		const validationResult = initialInterviewFormSchema.safeParse(initialInterviewForm);
		console.log(validationResult);
		return validationResult;
	}
}