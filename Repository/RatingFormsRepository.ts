import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { applicant, ApplicantSelect, ratingForms } from "~/lib/schema";
import { StageType } from "~/types/types";

export class RatingFormsRepository {
	static async updateRatingForm(
		updateEvaluateApplicantStatus: UpdateEvaluateApplicantStatusModel
	) {
		return await db
			.update(ratingForms)
			.set({ recruitment_stage: updateEvaluateApplicantStatus.recruitment_stage })
			.where(eq(ratingForms.applicant_id, updateEvaluateApplicantStatus.applicantId))
			.returning();
	}

	static async updateCurrentApplicantEvaluate(
		currentApplicant: ApplicantSelect,
		stagePassed: StageType,
		updateEvaluateApplicantStatus: UpdateEvaluateApplicantStatusModel,
		stageInProgress?: StageType
	) {
		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
					},
					[stagePassed]: {
						...currentApplicant.stages?.[stagePassed],
						status: updateEvaluateApplicantStatus.status,
					},
					[`${stageInProgress}`]: {
						status: "in-progress",
					},
				},
			})
			.where(eq(applicant.id, updateEvaluateApplicantStatus.applicantId));
	}
}
