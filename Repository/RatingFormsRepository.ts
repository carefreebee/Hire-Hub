import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { applicant, ApplicantSelect, ratingForms } from "~/lib/schema";
import { StageType } from "~/types/types";

export class RatingFormsRepository {
	public async getAllRatingFormsFilesById(id: number) {
		return await db.query.ratingForms.findMany({
			where: eq(ratingForms.applicant_id, id),
		});
	}

	public async getRatingFormsById(id: number) {
		return await db.query.ratingForms.findMany({
			where: eq(ratingForms.rating_id, id),
		});
	}

	public async updateCurrentApplicantEvaluate(
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
