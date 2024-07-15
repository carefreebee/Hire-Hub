import { z } from "zod";

export class Validator {
	static validateUsersData(usersData: Users) {
		const validationResult = usersSchema.safeParse(usersData);
		return validationResult;
	}
}

export const usersSchema = z.object({
	selected_position: z
		.string()
		.min(2, { message: "Selected Position must have 2 or more characters" }),
	selected_option: z.enum(["teaching_staff", "non-teaching_staff"]),
	selected_department: z.string().optional().nullable(),
	selected_office: z.string().optional().nullable(),
});

export type Users = z.infer<typeof usersSchema>;
