import { eq } from "drizzle-orm";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { db } from "~/lib/db";
import { applicant, RoleEnumsType } from "~/lib/schema";
import { StageType } from "~/types/types";

export class ApplicantStatusRepository {
	static async getCurrentApplicantById(applicantId: number) {
		const currentApplicant = await getApplicantFormByID(applicantId);

		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return currentApplicant;
	}

	static async updateScreeningDate(applicantId: number, updatedDate: Date) {
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

	static async updateInitialInterviewDate(applicantId: number, updatedDate: Date) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
					},
					initial_interview: {
						...currentApplicant.stages?.initial_interview,
						date: updatedDate,
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	static async updateScreeningStatus(
		applicantId: number,
		updateAssessedBy: string,
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
						assessed_by: [updateAssessedBy],
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

	static async updateInitialInterviewStatus(
		applicantId: number,
		stageType: StageType,
		updateAssessedBy: string,
		applicantUpdateStatus: "passed" | "failed",
		nextStage: StageType
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
						assessed_by: [updateAssessedBy],
						status: applicantUpdateStatus,
					},
					[`${nextStage}`]: {
						status: "in-progress",
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	static async updateApplicantStatus(
		applicantId: number,
		selectedMode: "online" | "in-person",
		assessedBy: string[],
		stageType: StageType,
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
