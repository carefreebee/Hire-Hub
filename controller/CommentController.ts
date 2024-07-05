"use server";

import { CommentService } from "~/service/CommentService";

export async function handleSubmitScreeningComment(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createScreeningComment(formData);
}

export async function handleSubmitInitialInterviewComment(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createInitialInterviewComment(formData);
}

export async function handleSubmitTeachingDemo(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createTeachingDemoComment(formData);
}

export async function handleSubmitInitialTeachingDemo(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createTeachingDemoComment(formData);
}

export async function handleSubmitPsychologicalExamComment(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createPsychologicalExamComment(formData);
}

export async function handleSubmitPanelInterviewComment(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createPanelInterviewComment(formData);
}

export async function handleSubmitRecommendationForHiringComment(formData: FormData) {
	const commentService = new CommentService();
	return await commentService.createRecommendationForHiringComment(formData);
}
