import { z } from "zod";
import { DepartmentOrOffice, departmentOrOfficeSchema } from "~/lib/zod";

const departmentSchema = z.object({
	department_name: z.string().min(5, { message: "Please must have 5 or more characters." }),
});

type Department = z.infer<typeof departmentSchema>;

const officeSchema = z.object({
	office_name: z.string().min(5, { message: "Please must have 5 or more characters." }),
});

type Office = z.infer<typeof officeSchema>;

export class Validator {
	static validateDepartment(department: Department) {
		const validationResult = departmentSchema.safeParse(department);
		console.log(validationResult);
		return validationResult;
	}

	static validateOffice(office: Office) {
		const validationResult = officeSchema.safeParse(office);
		console.log(validationResult);
		return validationResult;
	}

	static validateDepartmentOrOffice(departmentOrOffice: DepartmentOrOffice) {
		const validationResult = departmentOrOfficeSchema.safeParse(departmentOrOffice);
		console.log(validationResult);
		return validationResult;
	}
}
