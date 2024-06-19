import validator from "validator";
import { z } from "zod";

export const applicantSchema = z.object({
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
	communication: z.enum(["email", "phone_number"]),
	position: z.enum(["teaching_staff", "non-teaching_staff"]),
	department_name: z.string().optional().nullable(),
	office_name: z.string().optional().nullable(),
	resume: z.string().min(2, { message: "Please upload a resume" }),
	cv_letter: z.string().min(5, { message: "Please upload a CV Lettter" }),
});
