import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/HrHeadUpdatesApplicantForm";
import { ApplicantStagesInitialInterivew } from "~/lib/zod";
import { ApplicantStatusRepository } from "~/Repository/ApplicantStatusRepository";
import { StageType } from "~/types/types";
import { Validator } from "~/Validator/HrHeadUpdatesApplicantForm";

export class ApplicantStatusService {
	async updateDate(formData: FormData) {
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
				await ApplicantStatusRepository.updateScreeningDate(
					applicantStatus.applicant_id,
					updatedDate
				);
			} else if (pathname === "initial-interview") {
				await ApplicantStatusRepository.updateInitialInterviewDate(
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

	async updateStatus(formData: FormData) {
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
				await ApplicantStatusRepository.updateScreeningStatus(
					applicantUpdateStatus.applicant_id,
					applicantUpdateStatus.assessed_by_id,
					applicantUpdateStatus.status,
					"initial_interview"
				);
			} else if (pathname === "initial-interview") {
				await ApplicantStatusRepository.updateInitialInterviewStatus(
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

	async updateApplicantStatus(formData: FormData, stageType: StageType) {
		const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
		this.validateApplicantStatusInitialInterview(applicantInitialInterview);

		try {
			await ApplicantStatusRepository.updateApplicantStatus(
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

	async updateApplicantStatusTeachingDemo(formData: FormData) {
		this.updateApplicantStatus(formData, "teaching_demo");
	}

	async updateApplicantStatusPsychologicalExam(formData: FormData) {
		this.updateApplicantStatus(formData, "psychological_exam");
	}

	async updateApplicantStatusPanelInterview(formData: FormData) {
		this.updateApplicantStatus(formData, "panel_interview");
	}
	async updateApplicantStatusRecommendationForHiring(formData: FormData) {
		this.updateApplicantStatus(formData, "recommendation_for_hiring");
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

// async udpateScreeningDate(formData: FormData) {
// 	const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
// 	const applicantId = Number(formData.get("applicant_id"));
// 	const validateData = Validator.validateApplicantStagesDate(applicantStatus);

// 	if (!validateData.success) {
// 		console.error("Validation failed:", validateData.error);
// 		throw new Error("Validation failed");
// 	}

// 	const updatedDate = new Date(validateData.data.selected_date);

// 	try {
// 		await ApplicantStatusRepository.updateScreeningDateStatus(applicantId, updatedDate);

// 		revalidatePath(`/dashboard/applicant/${applicantId}`);
// 	} catch (error) {
// 		console.error("Update Applicant Status failed:", error);
// 		throw new Error("Update Applicant Status failed");
// 	}
// }

// async updateScreeningStatus(formData: FormData) {
// 	const applicantUpdateStatus =
// 		DataExtractor.extractApplicantScreeningAndInitialInterview(formData);
// 	const pathname = formData.get("pathname") as string;
// 	this.validateApplicantStatus(applicantUpdateStatus.status);

// 	try {
// 		await ApplicantStatusRepository.updateScreeningStatus(
// 			applicantUpdateStatus.applicant_id,
// 			applicantUpdateStatus.status,
// 			"initial_interview"
// 		);
// 		if (pathname === "screening") {
// 			await ApplicantStatusRepository.updateScreeningStatus(
// 				applicantUpdateStatus.applicant_id,
// 				applicantUpdateStatus.status,
// 				"initial_interview"
// 			);
// 		} else if (pathname === "initial-interview") {
// 			await ApplicantStatusRepository.updateInitialInterviewStatus(
// 				applicantUpdateStatus.applicant_id,
// 				applicantUpdateStatus.status,
// 				"initial_interview",
// 				"teaching_demo"
// 			);
// 		}

// 		revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicant_id}`);
// 	} catch (error) {
// 		console.error("Update Applicant Status failed:", error);
// 		throw new Error("Update Applicant Status failed");
// 	}
// }

// async updateInitialInterviewDate(formData: FormData) {
// 	const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
// 	const applicantId = Number(formData.get("applicant_id"));
// 	const validateData = Validator.validateApplicantStagesDate(applicantStatus);

// 	if (!validateData.success) {
// 		console.error("Validation failed:", validateData.error);
// 		throw new Error("Validation failed");
// 	}

// 	const updatedDate = new Date(validateData.data.selected_date);

// 	try {
// 		// await ApplicantStatusRepository.updateInitialInterviewDate(applicantId, updatedDate);

// 		revalidatePath(`/dashboard/applicant/${applicantId}`);
// 	} catch (error) {
// 		console.error("Update Applicant Status failed:", error);
// 		throw new Error("Update Applicant Status failed");
// 	}
// }

// async updateIntialInterviewStatus(formData: FormData) {
// 	const applicantUpdateStatus =
// 		DataExtractor.extractApplicantScreeningAndInitialInterview(formData);
// 	this.validateApplicantStatus(applicantUpdateStatus.status);

// 	try {
// 		await ApplicantStatusRepository.updateInitialInterviewStatus(
// 			applicantUpdateStatus.applicant_id,
// 			applicantUpdateStatus.status,
// 			"initial_interview",
// 			"teaching_demo"
// 		);
// 		console.log(applicantUpdateStatus);

// 		revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicant_id}`);
// 	} catch (error) {
// 		console.error("Update Applicant Status failed:", error);
// 		throw new Error("Update Applicant Status failed");
// 	}
// }

// async updateApplicantStatusInitialInterview(formData: FormData) {
// 	const applicantUpdateStatus =
// 		DataExtractor.extractApplicantScreeningAndInitialInterview(formData);
// 	this.validateApplicantStatus(applicantUpdateStatus.status);

// 	try {
// 		await ApplicantStatusRepository.updateInitialInterviewStatus(
// 			applicantUpdateStatus.applicant_id,
// 			applicantUpdateStatus.status,
// 			"initial_interview"
// 		);

// 		revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicant_id}`);
// 	} catch (error) {
// 		console.error("Update Applicant Status failed:", error);
// 		throw new Error("Update Applicant Status failed");
// 	}
// }

// private validateApplicantStatus(status: "passed" | "failed") {
// 	const allowedStatuses = ["passed", "failed"];

// 	if (!allowedStatuses.includes(status)) {
// 		throw new Error("Status is required and must be 'passed' or 'failed'");
// 	}
// }
