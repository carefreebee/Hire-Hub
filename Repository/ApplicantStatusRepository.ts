import { eq } from "drizzle-orm";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { db } from "~/lib/db";
import { applicant } from "~/lib/schema";
import { StageType } from "~/types/types";

export class ApplicantStatusRepository {
	public async getCurrentApplicantById(applicantId: number) {
		const currentApplicant = await getApplicantFormByID(applicantId);

		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return currentApplicant;
	}

	public async updateScreeningDate(applicantId: number, updatedDate: Date) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		const updateStage = {
			...currentApplicant.stages,
			screening: {
				...currentApplicant.stages?.screening,
				date: updatedDate,
			},
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	public async updateInitialInterviewDate(applicantId: number, updatedDate: Date) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		const updateStage = {
			...currentApplicant.stages,
			screening: {
				...currentApplicant.stages?.screening,
			},
			initial_interview: {
				...currentApplicant.stages?.initial_interview,
				date: updatedDate,
			},
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	public async updateScreeningStatus(
		applicantId: number,
		updateAssessedBy: string,
		applicantUpdateStatus: "passed" | "failed",
		stageType: StageType
	) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		const updateStage = {
			...currentApplicant.stages,
			screening: {
				...currentApplicant.stages?.screening,
				assessed_by: [updateAssessedBy],
				status: applicantUpdateStatus,
			},
			...(applicantUpdateStatus === "passed" && {
				[stageType]: {
					...currentApplicant.stages?.[stageType],
					status: "in-progress",
				},
			}),
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	public async updateInitialInterviewStatus(
		applicantId: number,
		stageType: StageType,
		updateAssessedBy: string,
		applicantUpdateStatus: "passed" | "failed",
		nextStage: StageType
	) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		const updateStage = {
			...currentApplicant.stages,
			screening: {
				...currentApplicant.stages?.screening,
			},
			[stageType]: {
				...currentApplicant.stages?.[stageType],
				assessed_by: [updateAssessedBy],
				status: applicantUpdateStatus,
			},
			...(applicantUpdateStatus === "passed" && {
				[nextStage]: {
					status: "in-progress",
				},
			}),
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId))
			.returning();
	}

	public async updateApplicantStatus(
		applicantId: number,
		selectedMode: "online" | "in-person",
		assessedBy: string[],
		stageType: StageType,
		selectedDate: Date
	) {
		const currentApplicant = await this.getCurrentApplicantById(applicantId);

		const updateStage = {
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
		};

		await db
			.update(applicant)
			.set({ stages: updateStage })
			.where(eq(applicant.id, applicantId))
			.returning();
	}
}
