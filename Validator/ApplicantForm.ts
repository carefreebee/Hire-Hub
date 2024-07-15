import validator from "validator";
import { z } from "zod";

export class Validator {
	static validateApplicantFormData(applicantFormData: ApplicantForm) {
		return applicantFormSchema.safeParse(applicantFormData);
	}
}

const applicantFormSchema = z.object({
	first_name: z
		.string()
		.min(2, { message: "First Name must have 2 or more characters" })
		.max(75, { message: "First Name must have 75 or less characters" }),
	last_name: z
		.string()
		.min(2, { message: "Last Name must have 2 or more characters" })
		.max(75, { message: "Last Name must have 75 or less characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	contact_number: z.string().refine((value) => validator.isMobilePhone(value, "en-PH"), {
		message: "Invalid mobile phone number",
	}),
	communication_type: z.enum(["email", "phone_number"]),
	positionType: z.enum(["teaching_staff", "non-teaching_staff"]),
	position_applied: z
		.string()
		.min(2, { message: "Position applied must have 2 or more characters" })
		.max(75, { message: "Position applied must have 75 or less characters" }),
	department_id: z.number().optional().nullable(),
	selected_department: z.string().optional().nullable(),
	office_id: z.number().optional().nullable(),
	selected_office: z.string().optional().nullable(),
	resume: z.string().min(5, { message: "Please upload a resume" }),
});

export type ApplicantForm = z.infer<typeof applicantFormSchema>;
