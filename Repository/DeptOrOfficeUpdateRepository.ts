import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { applicant, ApplicantSelect } from "~/lib/schema";
import { StageType } from "~/types/types";

export class DeptOrOfficeUpdateRepository {
	static async udpateInitialInterviewForm(
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
