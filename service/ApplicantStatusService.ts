import { revalidatePath } from "next/cache";
import { getApplicantFormByID } from "~/controller/ApplicantFormController";
import { DataExtractor } from "~/extractors/ApplicantStatus";
import { ApplicantStatusRepository } from "~/Repository/ApplicantStatusRepository";
import { StageType } from "~/types/types";
import { ApplicantStages, RecommendationStage, Validator } from "~/Validator/ApplicantStatus";

export class ApplicantStatusService {
	constructor(private readonly applicantStatusRepo: ApplicantStatusRepository) {}

	public async updateDate(formData: FormData) {
		const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
		const pathname = formData.get("pathname") as string;
		const validateData = Validator.validateApplicantStagesDate(applicantStatus);

		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error("Validation failed");
		}

		const updatedDate = new Date(validateData.data.selected_date);

		try {
			if (pathname === "screening") {
				await this.applicantStatusRepo.updateScreeningDate(
					applicantStatus.applicant_id,
					updatedDate
				);
			} else if (pathname === "initial-interview") {
				await this.applicantStatusRepo.updateInitialInterviewDate(
					applicantStatus.applicant_id,
					updatedDate
				);
			}

			revalidatePath(`/dashboard/applicant/${applicantStatus.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}
	public async updateInitialInterviewStatus(formData: FormData) {
		this.updateStatus(formData, "initial_interview");
	}
	public async updateTeachingDemoStatus(formData: FormData) {
		this.updateStatus(formData, "teaching_demo");
	}

	public async updatePsychologicalExamStatus(formData: FormData) {
		this.updateStatus(formData, "psychological_exam");
	}

	public async updatePanelInterviewStatus(formData: FormData) {
		this.updateStatus(formData, "panel_interview");
	}

	public async updateStatus(formData: FormData, stageType: StageType) {
		const applicantUpdateStatus = {
			applicant_id: Number(formData.get("applicant_id")),
			assessed_by_id: formData.get("assessed_by_id") as string,
			status: formData.get("applicant_status") as "passed" | "failed",
		};

		const allowedStatuses = ["passed", "failed"];
		if (!allowedStatuses.includes(applicantUpdateStatus.status)) {
			throw new Error("Status is required and must be 'passed' or 'failed'");
		}

		const currentApplicant = await getApplicantFormByID(applicantUpdateStatus.applicant_id);

		try {
			await this.applicantStatusRepo.updateScreeningStatus(
				currentApplicant?.id as number,
				applicantUpdateStatus.assessed_by_id,
				applicantUpdateStatus.status,
				stageType
			);

			revalidatePath(`/dashboard/evaluate/${applicantUpdateStatus.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	public async updateInitialInterview(formData: FormData) {
		this.updateApplicantStatus(formData, "initial_interview");
	}
	public async updateTeachingDemo(formData: FormData) {
		this.updateApplicantStatus(formData, "teaching_demo");
	}

	public async updatePsychologicalExam(formData: FormData) {
		this.updateApplicantStatus(formData, "psychological_exam");
	}

	public async updatePanelInterview(formData: FormData) {
		this.updateApplicantStatus(formData, "panel_interview");
	}

	private async updateApplicantStatus(formData: FormData, stageType: StageType) {
		const applicantStage = DataExtractor.extractApplicantStages(formData);
		this.validateApplicantStatus(applicantStage, stageType);

		try {
			await this.applicantStatusRepo.updateApplicantStatus(
				applicantStage.applicant_id,
				applicantStage.selected_mode,
				applicantStage.assessed_by,
				stageType,
				new Date(applicantStage.selected_date)
			);

			revalidatePath(`/dashboard/evaluate/${applicantStage.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateApplicantStatus(applicantStage: ApplicantStages, stageType: StageType) {
		const validateData = Validator.validateApplicantStatus(applicantStage);

		if (!validateData.success) {
			throw new Error(`Validation failed for ${stageType}`);
		}
	}

	public async updateRecommendationForHiring(formData: FormData) {
		const applicantRecommendationStage = DataExtractor.extractRecommendationStage(formData);
		this.validateRecommendationStatus(applicantRecommendationStage);

		try {
			await this.applicantStatusRepo.updateRecommendationStatus(
				applicantRecommendationStage.applicant_id,
				applicantRecommendationStage.assessed_by,
				"recommendation_for_hiring",
				new Date(applicantRecommendationStage.selected_date)
			);

			revalidatePath(`/dashboard/evaluate/${applicantRecommendationStage.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateRecommendationStatus(recommendation: RecommendationStage) {
		const validateData = Validator.validateRecommendationStatus(recommendation);

		if (!validateData.success) {
			throw new Error("Validation failed in recommendation for hiring");
		}
	}
}
