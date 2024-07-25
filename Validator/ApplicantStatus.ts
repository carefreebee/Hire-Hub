import { z } from "zod";

export class Validator {
	static validateApplicantStagesDate(applicantFormStages: ApplicantStagesDate) {
		const validationResult = applicantStagesDateSchema.safeParse(applicantFormStages);
		console.log("Validator", validationResult);
		return validationResult;
	}

	static validateApplicantStatus(applicantStatus: ApplicantStagesDate) {
		const validationResult = applicantStages.safeParse(applicantStatus);
		console.log("Validator", validationResult);
		return validationResult;
	}

	static validateRecommendationStatus(recommendationStatus: ApplicantStagesDate) {
		const validationResult = applicantStagesDateSchema.safeParse(recommendationStatus);
		console.log("Validator", validationResult);
		return validationResult;
	}
}

const applicantStagesDateSchema = z.object({
	selected_date: z.string().refine((val) => !isNaN(Date.parse(val))),
});

export type ApplicantStagesDate = z.infer<typeof applicantStagesDateSchema>;

const applicantStages = z.object({
	applicant_id: z.number(),
	selected_date: z.string().refine((val) => !isNaN(Date.parse(val))),
	selected_mode: z.enum(["online", "in-person"]),
	assessed_by: z.array(z.string()),
});

export type ApplicantStages = z.infer<typeof applicantStages>;

const recommendationStatus = z.object({
	applicant_id: z.number(),
	selected_date: z.string().refine((val) => !isNaN(Date.parse(val))),
	assessed_by: z.array(z.string()),
});

export type RecommendationStage = z.infer<typeof recommendationStatus>;
