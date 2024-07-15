"use server";

import { applicantStatusService } from "~/Dependencies/dependencies";

export async function UpdateScreeningAndInitialInterviewDate(formData: FormData) {
	return await applicantStatusService.updateDate(formData);
}

export async function UpdateScreeningAndInitialInterviewStatus(formData: FormData) {
	return await applicantStatusService.updateStatus(formData);
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
