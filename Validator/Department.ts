import { z } from "zod";

export class Validator {
	static validateDepartment(department: Department) {
		const validationResult = departmentSchema.safeParse(department);
		console.log(validationResult);
		return validationResult;
	}
}

const departmentSchema = z.object({
	department_name: z.string().min(5, { message: "Please must have 5 or more characters." }),
});

type Department = z.infer<typeof departmentSchema>;