import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/ApplicantStatus";
import { ApplicantStatusRepository } from "~/Repository/ApplicantStatusRepository";
import { StageType } from "~/types/types";
import { ApplicantStagesInitialInterivew, Validator } from "~/Validator/ApplicantStatus";

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

	public async updateStatus(formData: FormData) {
		const applicantUpdateStatus = {
			applicant_id: Number(formData.get("applicant_id")),
			assessed_by_id: formData.get("assessed_by_id") as string,
			status: formData.get("applicant_status") as "passed" | "failed",
		};
		const pathname = formData.get("pathname") as string;

		const allowedStatuses = ["passed", "failed"];

		if (!allowedStatuses.includes(applicantUpdateStatus.status)) {
			throw new Error("Status is required and must be 'passed' or 'failed'");
		}

		try {
			if (pathname === "screening") {
				await this.applicantStatusRepo.updateScreeningStatus(
					applicantUpdateStatus.applicant_id,
					applicantUpdateStatus.assessed_by_id,
					applicantUpdateStatus.status,
					"initial_interview"
				);
			} else if (pathname === "initial-interview") {
				await this.applicantStatusRepo.updateInitialInterviewStatus(
					applicantUpdateStatus.applicant_id,
					"initial_interview",
					applicantUpdateStatus.assessed_by_id,
					applicantUpdateStatus.status,
					"teaching_demo"
				);
			}

			revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
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
	public async updateRecommendationForHiring(formData: FormData) {
		this.updateApplicantStatus(formData, "recommendation_for_hiring");
	}

	public async updateApplicantStatus(formData: FormData, stageType: StageType) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview, stageType);

		try {
			await this.applicantStatusRepo.updateApplicantStatus(
				applicantInitialInterview.applicant_id,
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				stageType,
				new Date(applicantInitialInterview.selected_date)
			);
			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateApplicantStatusInitialInterview(
		applicantInitialInterview: ApplicantStagesInitialInterivew,
		stageType: StageType
	) {
		const validateData =
			Validator.validateApplicantStatusInitialInterview(applicantInitialInterview);

		if (!validateData.success) {
			throw new Error(`Validation failed for ${stageType}`);
		}
	}
}
