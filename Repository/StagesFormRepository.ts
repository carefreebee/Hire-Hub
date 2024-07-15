import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { applicant, ApplicantSelect, ratingForms, RatingFormsInsert } from "~/lib/schema";
import { StageType } from "~/types/types";

export class StagesFormRepository {
	public async insertForm(stagesForm: RatingFormsInsert) {
		return await db.insert(ratingForms).values(stagesForm).returning();
	}

	public async updateStagesForm(
		currentApplicant: ApplicantSelect,
		stageType: StageType,
		rating_id: number,
		applicantId: number
	) {
		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
					},
					[stageType]: {
						...currentApplicant.stages?.[stageType],
						rating_forms_id: [
							...(currentApplicant.stages?.[stageType]?.rating_forms_id || []),
							rating_id,
						],
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}
}
