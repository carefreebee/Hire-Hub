import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/Comment";
import { Comment } from "~/lib/zod";
import { CommentRepository } from "~/Repository/CommentRepository";
import { StageType } from "~/types/types";
import { Validator } from "~/Validator/Comment";

export class CommentService {
	async createScreeningComment(formData: FormData) {
		const comment = DataExtractor.extractApplicantScreeningComment(formData);
		this.validateComment(comment);

		try {
			await CommentRepository.updateApplicantScreeningComment(comment.applicant_id, comment);

			revalidatePath(`/dashboard/applicant/${comment.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async createComment(formData: FormData, commentType: StageType) {
		const comment = DataExtractor.extractApplicantScreeningComment(formData);
		this.validateComment(comment);

		try {
			await CommentRepository.updateApplicantComment(
				comment.applicant_id,
				comment,
				commentType
			);

			revalidatePath(`/dashboard/applicant/${comment.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async createInitialInterviewComment(formData: FormData) {
		await this.createComment(formData, "initial_interview")
	}

	async createTeachingDemoComment(formData: FormData) {
		await this.createComment(formData, "teaching_demo");
	}

	async createPsychologicalExamComment(formData: FormData) {
		await this.createComment(formData, "psychological_exam");
	}

	async createPanelInterviewComment(formData: FormData) {
		await this.createComment(formData, "panel_interview");
	}

	async createRecommendationForHiringComment(formData: FormData) {
		await this.createComment(formData, "recommendation_for_hiring");
	}

	private validateComment(comment: Comment): void {
		const validateData = Validator.validateComment(comment);
		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error(`Validation failed: ${validateData.error}`);
		}
	}
}
