"use server";

import { commentService } from "~/Dependencies/dependencies";

export async function getApplicantCommentByID(id: number) {
	return await commentService.getAllCommentsById(id);
}

export async function getAllCommentsByID(applicantId: number, commentId: number[]) {
	return await commentService.getCommentsByID(applicantId, commentId);
}

export async function CreateScreeningComment(formData: FormData) {
	return await commentService.createScreeningComment(formData);
}

export async function CreateInitialInterviewComment(formData: FormData) {
	return await commentService.createComment(formData, "initial_interview");
}

export async function CreateTeachingDemoComment(formData: FormData) {
	return await commentService.createComment(formData, "teaching_demo");
}

export async function CreatePsychologicalExamComment(formData: FormData) {
	return await commentService.createComment(formData, "psychological_exam");
}

export async function CreatePanelInterviewComment(formData: FormData) {
	return await commentService.createComment(formData, "panel_interview");
}

export async function CreateRecommendationForHiringComment(formData: FormData) {
	return await commentService.createComment(formData, "recommendation_for_hiring");
}
