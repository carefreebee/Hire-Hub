import { EditJobRequest, JobRequest, editJobRequestSchema, jobRequestSchema } from "~/lib/zod";

export class Validator {
	static validateJobRequestData(jobRequestData: JobRequest) {
		const validationResult = jobRequestSchema.safeParse(jobRequestData);
		console.log(validationResult);
		return validationResult;
	}

	static validateEditJobRequestData(jobRequestData: EditJobRequest) {
		const validationResult = editJobRequestSchema.safeParse(jobRequestData);
		console.log(validationResult);
		return validationResult;
	}
}

