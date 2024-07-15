import { revalidatePath } from "next/cache";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { DataExtractor } from "~/DataExtractor/RatingForms";
import { ApplicantSelect } from "~/lib/schema";
import { RatingFormsRepository } from "~/Repository/RatingFormsRepository";
import { StageType } from "~/types/types";

export class RatingFormsService {
	constructor(private ratingFormsRepo: RatingFormsRepository) {}

	public async getAllRatingFormsFilesById(id: number) {
		return await this.ratingFormsRepo.getAllRatingFormsFilesById(id);
	}

	public async getRatingFormsById(id: number) {
		return await this.ratingFormsRepo.getRatingFormsById(id);
	}

	public async updateEvaluateApplicantStatus(formData: FormData) {
		const updateEvaluateApplicantStatus = DataExtractor.extractRatingFormData(formData);

		const requiredFields = ["passed" || "failed"];

		if (!requiredFields.includes(updateEvaluateApplicantStatus.status)) {
			throw new Error("Please don't forget the update the applicant status passed || failed");
		}

		try {
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
				await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
					currentApplicant,
					"initial_interview",
					updateEvaluateApplicantStatus,
					"teaching_demo"
				);
			} else if (checkIfInitialTeachingDemo) {
				await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
					currentApplicant,
					"teaching_demo",
					updateEvaluateApplicantStatus,
					"psychological_exam"
				);
			} else if (checkIfInitialPsychologicalExam) {
				await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
					currentApplicant,
					"psychological_exam",
					updateEvaluateApplicantStatus,
					"panel_interview"
				);
			} else if (checkIfInitialPanelInterview) {
				await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
					currentApplicant,
					"panel_interview",
					updateEvaluateApplicantStatus,
					"recommendation_for_hiring"
				);
			} else if (checkIfInitialRecommendedForHiring) {
				await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
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
