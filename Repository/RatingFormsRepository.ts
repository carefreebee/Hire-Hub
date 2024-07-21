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
		applicantId: number,
		updateApplicantStatus: "passed" | "failed",
		stageInProgress?: StageType
	) {
		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		const updateStage = {
			...currentApplicant.stages,
			screening: {
				...currentApplicant.stages?.screening,
			},
			[stagePassed]: {
				...currentApplicant.stages?.[stagePassed],
				status: updateApplicantStatus,
			},
			...(updateApplicantStatus === "passed" &&
				stageInProgress && {
					[stageInProgress]: {
						status: "in-progress",
					},
				}),
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId));
	}
}
