import { z } from "zod";

export class Validator {
	static validateOffice(office: Office) {
		const validationResult = officeSchema.safeParse(office);
		console.log(validationResult);
		return validationResult;
	}
}

const officeSchema = z.object({
	office_code: z.string().min(2, { message: "Please must have 2 or more characters." }),
	office_name: z.string().min(5, { message: "Please must have 5 or more characters." }),
});

export type Office = z.infer<typeof officeSchema>;
