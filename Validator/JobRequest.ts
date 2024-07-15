import { z } from "zod";

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

const jobRequestSchema = z.object({
	requested_position: z
		.string()
		.min(2, { message: "Requested Position must have 2 or more characters" }),
	requested_category: z.enum(["teaching_staff", "non-teaching_staff"]),
	department_id: z.number().optional().nullable(),
	requested_department: z.string().optional().nullable(),
	office_id: z.number().optional().nullable(),
	requested_office: z.string().optional().nullable(),
	requested_type: z.enum(["full_time", "part_time"]),
	requested_description: z.string().min(2, { message: "Please add a job description" }),
	requested_qualification: z.string().min(2, { message: "Please add a job qualification" }),
});

export type JobRequest = z.infer<typeof jobRequestSchema>;

const editJobRequestSchema = z.object({
	requested_position: z
		.string()
		.min(2, { message: "Requested Position must have 2 or more characters" }),
	requested_department: z.string().optional().nullable(),
	requested_office: z.string().optional().nullable(),
	requested_type: z.enum(["full_time", "part_time"]),
	requested_description: z.string().min(2, { message: "Please add a job description" }),
	requested_qualification: z.string().min(2, { message: "Please add a job qualification" }),
});

export type EditJobRequest = z.infer<typeof editJobRequestSchema>;
