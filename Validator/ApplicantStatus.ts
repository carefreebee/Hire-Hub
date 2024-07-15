import { z } from "zod";

export class Validator {
	static validateApplicantStagesDate(applicantFormStages: ApplicantStagesDate) {
		const validationResult = applicantStagesDateSchema.safeParse(applicantFormStages);
		console.log("Validator", validationResult);
		return validationResult;
	}

	static validateApplicantStatusInitialInterview(applicantInitialInterview: ApplicantStagesDate) {
		const validationResult =
			applicantStagesInitialInterview.safeParse(applicantInitialInterview);
		console.log("Validator", validationResult);
		return validationResult;
	}
}

const applicantStagesDateSchema = z.object({
	selected_date: z.string().refine((val) => !isNaN(Date.parse(val))),
});

export type ApplicantStagesDate = z.infer<typeof applicantStagesDateSchema>;

const applicantStagesInitialInterview = z.object({
	applicant_id: z.number(),
	selected_date: z.string().refine((val) => !isNaN(Date.parse(val))),
	selected_mode: z.enum(["online", "in-person"]),
	assessed_by: z.array(z.string()),
});

export type ApplicantStagesInitialInterivew = z.infer<typeof applicantStagesInitialInterview>;
