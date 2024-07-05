import { eq } from "drizzle-orm";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { db } from "~/lib/db";
import { applicant, RoleEnumsType } from "~/lib/schema";
import { StageType } from "~/types/types";

export class UpdateApplicantStatusRepository {
	static async getCurrentApplicantById(applicantId: number) {
		const currentApplicant = await getApplicantFormByID(applicantId);

		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return currentApplicant;
	}

	static async updateScreeningDateStatus(applicantId: number, updatedDate: Date) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
						date: updatedDate,
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	static async updateScreeningStatus(
		applicantId: number,
		applicantUpdateStatus: "passed" | "failed",
		stageType: StageType
	) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
						status: applicantUpdateStatus,
					},
					[stageType]: {
						...currentApplicant.stages?.[stageType],
						status: "in-progress",
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	static async updateIntitialInterviewStatus(
		applicantId: number,
        stageType: StageType,
		selectedMode: "online" | "in-person",
		assessedBy: RoleEnumsType[],
        selectedDate: Date
	) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
					},
					[stageType]: {
						...currentApplicant.stages?.[stageType],
						mode: selectedMode,
						assessed_by: assessedBy,
						date: new Date(selectedDate),
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}
}
