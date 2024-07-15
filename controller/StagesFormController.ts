"use server";

import { stagesFormService } from "~/Dependencies/dependencies";

export async function UpdateInitalInterview(formData: FormData) {
	return await stagesFormService.updateInitalInterview(formData);
}

export async function UpdateTeachingDemo(formData: FormData) {
	return await stagesFormService.updateTeachingDemo(formData);
}

export async function UpdatePsychologicalExam(formData: FormData) {
	return await stagesFormService.updatePsychologicalExam(formData);
}

export async function UpdatePanelInterview(formData: FormData) {
	return await stagesFormService.updatePanelInterview(formData);
}

export async function UpdateRecommendationForHiring(formData: FormData) {
	return await stagesFormService.updateRecommendationForHiring(formData);
}
