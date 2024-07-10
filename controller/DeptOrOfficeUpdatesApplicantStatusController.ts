"use server";

import { DeptOrOfficeUpdatesApplicantStatusService } from "~/service/DeptOrOfficeUpdatesApplicantStatusService";

export async function updateInitialInterviewForm(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updateInitialInterviewForm(formData);
}

export async function updateTeachingDemoForm(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updateTeachingDemoForm(formData);
}

export async function updatePsychologicalExam(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updatePsychologicalExam(formData);
}

export async function updatePanelInterview(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updatePanelInterview(formData);
}

export async function updateRecommendationForHiring(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updateRecommendationForHiring(formData);
}
