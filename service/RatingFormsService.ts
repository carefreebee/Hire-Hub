import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { DataExtractor } from "~/DataExtractor/RatingForms";
import { db } from "~/lib/db";
import { ApplicantSelect, ratingForms } from "~/lib/schema";
import { RatingFormsRepository } from "~/Repository/RatingFormsRepository";
import { StageType } from "~/types/types";

export class RatingFormsService {
	async getAllRatingFormsFiles() {
		return await db.query.ratingForms.findMany();
	}

	async getAllRatingFormsFilesById(id: number) {
		return await db.query.ratingForms.findMany({
			where: eq(ratingForms.applicant_id, id),
		});
	}

	async updateEvaluateApplicantStatus(formData: FormData) {
		const updateEvaluateApplicantStatus = DataExtractor.extractRatingFormData(formData);

		const requiredFields = ["passed" || "failed"];

		if (!requiredFields.includes(updateEvaluateApplicantStatus.status)) {
			throw new Error("Please don't forget the update the applicant status passed || failed");
		}

		try {
			await RatingFormsRepository.updateRatingForm(updateEvaluateApplicantStatus);

			const currentApplicant = await getApplicantFormByID(
				updateEvaluateApplicantStatus.applicantId
			);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			const checkIfInitialInterviewIsPassed =
				this.StageStatus(currentApplicant, "initial_interview") !== "passed";
			const checkIfInitialTeachingDemo =
				this.StageStatus(currentApplicant, "teaching_demo") !== "passed";
			const checkIfInitialPsychologicalExam =
				this.StageStatus(currentApplicant, "psychological_exam") !== "passed";
			const checkIfInitialPanelInterview =
				this.StageStatus(currentApplicant, "panel_interview") !== "passed";
			const checkIfInitialRecommendedForHiring =
				this.StageStatus(currentApplicant, "recommendation_for_hiring") !== "passed";

			if (checkIfInitialInterviewIsPassed) {
				await RatingFormsRepository.updateCurrentApplicantEvaluate(
					currentApplicant,
					"initial_interview",
					updateEvaluateApplicantStatus,
					"teaching_demo"
				);
			} else if (checkIfInitialTeachingDemo) {
				await RatingFormsRepository.updateCurrentApplicantEvaluate(
					currentApplicant,
					"teaching_demo",
					updateEvaluateApplicantStatus,
					"psychological_exam"
				);
			} else if (checkIfInitialPsychologicalExam) {
				await RatingFormsRepository.updateCurrentApplicantEvaluate(
					currentApplicant,
					"psychological_exam",
					updateEvaluateApplicantStatus,
					"panel_interview"
				);
			} else if (checkIfInitialPanelInterview) {
				await RatingFormsRepository.updateCurrentApplicantEvaluate(
					currentApplicant,
					"panel_interview",
					updateEvaluateApplicantStatus,
					"recommendation_for_hiring"
				);
			} else if (checkIfInitialRecommendedForHiring) {
				await RatingFormsRepository.updateCurrentApplicantEvaluate(
					currentApplicant,
					"recommendation_for_hiring",
					updateEvaluateApplicantStatus
				);
			}

			revalidatePath(`/dashboard/applicant/${updateEvaluateApplicantStatus.applicantId}`);
		} catch (error) {
			console.error("Update Evaluate Applicant Status failed:", error);
			throw new Error("Update Evaluate Applicant Status failed");
		}
	}

	private StageStatus(currentApplicant: ApplicantSelect, stage: StageType) {
		return currentApplicant?.stages?.[stage]?.status;
	}
}
