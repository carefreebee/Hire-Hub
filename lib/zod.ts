import validator from "validator";
import { z } from "zod";
import { roleEnums } from "./schema";

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
	birthday: z.string().refine((value) => validator.isDate(value), {
		message: "Invalid date format",
	}),
	address: z.string().min(2, { message: "Address is required" }),
	province: z.string().min(2, { message: "Province is required" }),
	city: z.string().min(2, { message: "City is required" }),
	baranggay: z.string().min(2, { message: "Barangay is required" }),
	civil_stats: z.enum(["single", "married", "widowed"], { message: "Invalid civil status" }), // Civil status enums
	educational_attainment: z.enum(["doctorate", "masteral", "bachelors"], {
		message: "Invalid educational attainment",
	}),
	degree: z.string().min(2, { message: "Degree is required" }),
	job_experience: z.enum(["entry_level", "experienced", "advanced"], {
		message: "Invalid job experience",
	}),
	skills: z.string().optional().nullable(),
	contact_number: z.string().refine((value) => validator.isMobilePhone(value, "en-PH"), {
		message: "Invalid mobile phone number",
	}),
	resume: z.object({
		resume_name: z.string().min(1, { message: "Resume name is required" }),
		resume_url: z.string().url({ message: "Invalid resume URL" }),
		letter_name: z.string().min(1, { message: "CV letter name is required" }),
		letter_url: z.string().url({ message: "Invalid CV letter URL" }),
	}),
	communication_type: z.enum(["email", "phone_number"], {
		message: "Invalid communication type",
	}), // Communication type enums
	positionType: z.enum(["teaching_staff", "non_teaching_staff"], {
		message: "Invalid position type",
	}),
	position_applied: z.string().min(2, { message: "Position applied is required" }),
	department_id: z.number().optional().nullable(),
	office_id: z.number().optional().nullable(),
	selected_department: z.string().optional().nullable(),
	selected_office: z.string().optional().nullable(),
});

export const departmentOrOfficeSchema = z
	.object({
		selected_category: z.enum(["teaching_staff", "non-teaching_staff"]),
		department_name: z.string().optional().nullable(),
		office_name: z.string().optional().nullable(),
	})
	.refine(
		(data) => {
			if (
				data.selected_category === "teaching_staff" &&
				(!data.department_name || data.department_name.length < 5)
			) {
				return false;
			}
			if (
				data.selected_category === "non-teaching_staff" &&
				(!data.office_name || data.office_name.length < 5)
			) {
				return false;
			}
			return true;
		},
		{
			message:
				"Invalid data: Department name must be provided for teaching staff, and office name must be provided for non-teaching staff",
			path: ["selected_category"],
		}
	);

export type DepartmentOrOffice = z.infer<typeof departmentOrOfficeSchema>;
