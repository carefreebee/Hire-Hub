import validator from "validator";
import { z } from "zod";

export class Validator {
	static validateApplicantFormData(applicantFormData: ApplicantForm) {
		return applicantFormSchema.safeParse(applicantFormData);
	}
}

export const applicantFormSchema = z.object({
	first_name: z
		.string()
		.min(2, { message: "First Name must have 2 or more characters" })
		.max(75, { message: "First Name must have 75 or less characters" }),
	last_name: z
		.string()
		.min(2, { message: "Last Name must have 2 or more characters" })
		.max(75, { message: "Last Name must have 75 or less characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	gender: z.enum(["male", "female", "prefer_not_to_say"], { message: "Invalid gender type" }), // Gender enums
	birthdate: z.string().refine((value) => validator.isDate(value), {
		message: "Invalid date format",
	}),
	address: z.string().min(2, { message: "Address is required" }),
	province: z.string().min(2, { message: "Province is required" }),
	city: z.string().min(2, { message: "City is required" }),
	baranggay: z.string().min(2, { message: "Barangay is required" }),
	civil_stats: z.enum(["single", "married", "widowed"], { message: "Invalid civil status" }), // Civil status enums
	educational_attainment: z.enum(["doctorate", "masteral", "bachelors"], {
		message: "Invalid educational attainment",
	}), // Educational attainment enums
	degree: z.string().min(2, { message: "Degree is required" }),
	job_experience: z.enum(["entry_level", "experienced", "advanced"], {
		message: "Invalid job experience",
	}), // Job experience enums
	skills: z.string().optional().nullable(),
	contact_number: z.string().refine((value) => validator.isMobilePhone(value, "en-PH"), {
		message: "Invalid mobile phone number",
	}),
	resume_name: z.string().min(1, { message: "Resume name is required" }),
	resume_url: z.string().url({ message: "Invalid resume URL" }),
	letter_name: z.string().min(1, { message: "CV letter name is required" }),
	letter_url: z.string().url({ message: "Invalid CV letter URL" }),
	communication_type: z.enum(["email", "phone_number"], {
		message: "Invalid communication type",
	}),
});

export type ApplicantForm = z.infer<typeof applicantFormSchema>;
