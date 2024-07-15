import { z } from "zod";

export class Validator {
	static validateStagesForm(stagesForm: StagesForm) {
		const validationResult = formSchema.safeParse(stagesForm);
		console.log(validationResult);
		return validationResult;
	}
}

export const formSchema = z.object({
	rate: z.string().min(5, { message: "Please don't forget to updload the form." }),
});

export type StagesForm = z.infer<typeof formSchema>;
