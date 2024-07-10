import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/DeptOrOfficeUpdatesApplicantForm";
import { DeptOrOfficeUpdateRepository } from "~/Repository/DeptOrOfficeUpdateRepository";
import { Validator } from "~/Validator/DeptOrOfficeUpdatesApplicantForm";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { db } from "~/lib/db";
import { ratingForms, RatingFormsInsert } from "~/lib/schema";
import { InitialInterviewForm } from "~/lib/zod";
import { StageType } from "~/types/types";

export class DeptOrOfficeUpdatesApplicantStatusService {
	async insertForm(initialInterviewForm: RatingFormsInsert) {
		return await db.insert(ratingForms).values(initialInterviewForm).returning();
	}

	async updateForm(formData: FormData, stageType: StageType) {
		const initialInterviewForm = DataExtractor.extractApplicantInitialInterviewForm(formData);
		this.validateForm(initialInterviewForm);

		try {
			const insertedRatingForm = await this.insertForm(initialInterviewForm);
			const currentApplicant = await getApplicantFormByID(initialInterviewForm.applicant_id);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await DeptOrOfficeUpdateRepository.udpateInitialInterviewForm(
				currentApplicant,
				stageType,
				insertedRatingForm[0].rating_id,
				initialInterviewForm.applicant_id
			);

			revalidatePath(`/dashboard/applicant/${initialInterviewForm.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateInitialInterviewForm(formData: FormData) {
		await this.updateForm(formData, "initial_interview");
	}

	async updateTeachingDemoForm(formData: FormData) {
		await this.updateForm(formData, "teaching_demo");
	}

	async updatePsychologicalExam(formData: FormData) {
		await this.updateForm(formData, "psychological_exam");
	}

	async updatePanelInterview(formData: FormData) {
		await this.updateForm(formData, "panel_interview");
	}

	async updateRecommendationForHiring(formData: FormData) {
		await this.updateForm(formData, "recommendation_for_hiring");
	}

	// async updateTeachingDemoForm(formData: FormData) {
	// 	const initialInterviewForm = DataExtractor.extractApplicantInitialInterviewForm(formData);
	// 	this.validateForm(initialInterviewForm);

	// 	try {
	// 		const insertedRatingForm = await this.insertForm(initialInterviewForm);
	// 		const currentApplicant = await getApplicantFormByID(initialInterviewForm.applicant_id);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		const ratingFormId = insertedRatingForm.map((rating) => rating.rating_id);

	// 		await DeptOrOfficeUpdateRepository.udpateInitialInterviewForm(
	// 			currentApplicant,
	// 			"teaching_demo",
	// 			ratingFormId,
	// 			initialInterviewForm.applicant_id
	// 		);

	// 		revalidatePath(`/dashboard/applicant/${initialInterviewForm.applicant_id}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	private validateForm(initialInterviewForm: InitialInterviewForm) {
		const validateData = Validator.validateInitialInterviewForm(initialInterviewForm);

		if (!validateData.success) {
			throw new Error("Rate for Initial Interview is required");
		}
	}

	// private StageStatus(currentApplicant: ApplicantSelect, stage: StageType) {
	// 	return currentApplicant?.stages?.[stage]?.status;
	// }
}
