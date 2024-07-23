import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { applicant, ApplicantSelect, ratingForms, users } from "~/lib/schema";
import { StageType } from "~/types/types";

export class RatingFormsRepository {
	public async getAllRaitingFormById(applicantId: number) {
		const rawResults = await db
			.select()
			.from(ratingForms)
			.leftJoin(applicant, eq(ratingForms.applicant_id, applicant.id))
			.leftJoin(users, eq(ratingForms.user_id, users.id))
			.where(eq(ratingForms.applicant_id, applicantId))
			.orderBy(ratingForms.rating_id);

		return rawResults.map((row) => ({
			...row.rating_forms,
			name: row?.users?.name,
			role: row?.users?.role,
		}));
	}

	public async getAllRatingFormsFilesById(id: number) {
		return await db.query.ratingForms.findMany({
			where: eq(ratingForms.applicant_id, id),
		});
	}

	public async getAllApplicantRatingForms() {
		return await db
			.select()
			.from(applicant)
			.leftJoin(ratingForms, eq(applicant.id, ratingForms.applicant_id));
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
