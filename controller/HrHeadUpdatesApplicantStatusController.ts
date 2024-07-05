"use server";

import { HrHeadUpdatesApplicantStatusService } from "~/service/HrHeadUpdatesApplicantStatusService";

export async function handleHrHeadUdpatesApplicantStatusScreeningDate(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusScreeningDate(formData);
}

export async function handleUdpateApplicantStatusScreeningStatus(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusScreeningStatus(formData);
}

export async function handleHrHeadUpdatesApplicantStatusInitialInterview(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusInitialInterview(formData);
}

export async function handleHrHeadUpdatesApplicantStatusTeachingDemo(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusTeachingDemo(formData);
}

export async function handleHrHeadUpdatesApplicantStatusPsychologicalExam(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusPsychologicalExam(formData);
}

export async function handleHrHeadUpdatesApplicantStatusPanelInterview(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusPanelInterview(formData);
}

export async function handleHrHeadUpdatesApplicantStatusRecommendationForHiring(formData: FormData) {
	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
	return await applicantFormService.updateApplicantStatusRecommendationForHiring(formData);
}