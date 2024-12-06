"use server";

import { applicantStatusService } from "~/Dependencies/dependencies";
import { StageType } from "~/types/types";

export async function UpdateScreeningAndInitialInterviewDate(formData: FormData) {
	return await applicantStatusService.updateDate(formData);
}

export async function UpdateScreening(formData: FormData, stageType: StageType) {
	return await applicantStatusService.updateStatus(formData, stageType);
}

export async function UpdateTeachingDemo(formData: FormData) {
	return await applicantStatusService.updateTeachingDemo(formData);
}

export async function UpdatePsychologicalExam(formData: FormData) {
	return await applicantStatusService.updatePsychologicalExam(formData);
}

export async function UpdatePanelInterview(formData: FormData) {
	return await applicantStatusService.updatePanelInterview(formData);
}

export async function UpdateRecommendationForHiring(formData: FormData) {
	return await applicantStatusService.updateRecommendationForHiring(formData);
}

// New function for updating Initial Interview status
export async function UpdateInitialInterview(formData: FormData) {
	return await applicantStatusService.updateInitialInterview(formData); // Ensure this method exists in applicantStatusService
}
