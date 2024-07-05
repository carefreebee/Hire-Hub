import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/HrHeadUpdatesApplicantForm";
import { ApplicantStagesInitialInterivew } from "~/lib/zod";
import { UpdateApplicantStatusRepository } from "~/Repository/HrHeadUpdatedApplicantStatusRepository";
import { Validator } from "~/Validator/HrHeadUpdatesApplicantForm";

export class HrHeadUpdatesApplicantStatusService {
	async updateApplicantStatusScreeningDate(formData: FormData) {
		const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
		const applicantId = Number(formData.get("applicant_id"));
		const validateData = Validator.validateApplicantStagesDate(applicantStatus);

		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error("Validation failed");
		}

		const updatedDate = new Date(validateData.data.selected_date);

		try {
			await UpdateApplicantStatusRepository.updateScreeningDateStatus(
				applicantId,
				updatedDate
			);

			revalidatePath(`/dashboard/applicant/${applicantId}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusScreeningStatus(formData: FormData) {
		const applicantUpdateStatus = {
			applicantId: Number(formData.get("applicant_id")),
			status: formData.get("applicant_status") as "passed" | "failed",
		};

		const allowedStatuses = ["passed", "failed"];

		if (!allowedStatuses.includes(applicantUpdateStatus.status)) {
			throw new Error("Status is required and must be 'passed' or 'failed'");
		}

		try {
			await UpdateApplicantStatusRepository.updateScreeningStatus(
				applicantUpdateStatus.applicantId,
				applicantUpdateStatus.status,
				"initial_interview"
			);

			revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicantId}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusInitialInterview(formData: FormData) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await UpdateApplicantStatusRepository.updateIntitialInterviewStatus(
				applicantInitialInterview.applicant_id,
				"initial_interview",
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				new Date(applicantInitialInterview.selected_date)
			);

			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusTeachingDemo(formData: FormData) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await UpdateApplicantStatusRepository.updateIntitialInterviewStatus(
				applicantInitialInterview.applicant_id,
				"teaching_demo",
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				new Date(applicantInitialInterview.selected_date)
			);
			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusPsychologicalExam(formData: FormData) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await UpdateApplicantStatusRepository.updateIntitialInterviewStatus(
				applicantInitialInterview.applicant_id,
				"psychological_exam",
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				new Date(applicantInitialInterview.selected_date)
			);
			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusPanelInterview(formData: FormData) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await UpdateApplicantStatusRepository.updateIntitialInterviewStatus(
				applicantInitialInterview.applicant_id,
				"panel_interview",
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				new Date(applicantInitialInterview.selected_date)
			);
			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}
	async updateApplicantStatusRecommendationForHiring(formData: FormData) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await UpdateApplicantStatusRepository.updateIntitialInterviewStatus(
				applicantInitialInterview.applicant_id,
				"recommendation_for_hiring",
				applicantInitialInterview.selected_mode,
				applicantInitialInterview.assessed_by,
				new Date(applicantInitialInterview.selected_date)
			);
			revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateApplicantStatusInitialInterview(
		applicantInitialInterview: ApplicantStagesInitialInterivew
	) {
		const validateData =
			Validator.validateApplicantStatusInitialInterview(applicantInitialInterview);
		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error("Validation failed");
		}
	}
}
