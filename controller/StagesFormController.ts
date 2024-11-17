"use server";

import { stagesFormService } from "~/dependencies/dependencies";

export async function UpdateInitalInterview(formData: FormData) {
	return await stagesFormService.updateForm(formData, "initial_interview");
}

export async function UpdateTeachingDemo(formData: FormData) {
	return await stagesFormService.updateForm(formData, "teaching_demo");
}

export async function UpdatePsychologicalExam(formData: FormData) {
	return await stagesFormService.updateForm(formData, "psychological_exam");
}

export async function UpdatePanelInterview(formData: FormData) {
	return await stagesFormService.updateForm(formData, "panel_interview");
}

export async function UpdateRecommendationForHiring(formData: FormData) {
	return await stagesFormService.updateForm(formData, "recommendation_for_hiring");
}
