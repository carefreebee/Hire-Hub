"use server";

import { ApplicantStatusService } from "~/service/ApplicantStatusService";

export async function UpdateScreeningAndInitialInterviewDate(formData: FormData) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateDate(formData);
}

export async function UpdateScreeningAndInitialInterviewStatus(formData: FormData) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateStatus(formData);
}

export async function handleHrHeadUpdatesApplicantStatusTeachingDemo(formData: FormData) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateApplicantStatusTeachingDemo(formData);
}

export async function handleHrHeadUpdatesApplicantStatusPsychologicalExam(formData: FormData) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateApplicantStatusPsychologicalExam(formData);
}

export async function handleHrHeadUpdatesApplicantStatusPanelInterview(formData: FormData) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateApplicantStatusPanelInterview(formData);
}

export async function handleHrHeadUpdatesApplicantStatusRecommendationForHiring(
	formData: FormData
) {
	const applicantFormService = new ApplicantStatusService();
	return await applicantFormService.updateApplicantStatusRecommendationForHiring(formData);
}

// export async function UpdateApplicantDateStatus(formData: FormData) {
// 	const applicantFormService = new ApplicantStatusService();
// 	return await applicantFormService.udpateScreeningDate(formData);
// }

// export async function UpdateApplicantScreeningStatus(formData: FormData) {
// 	const applicantFormService = new ApplicantStatusService();
// 	return await applicantFormService.updateScreeningStatus(formData);
// }

// export async function UpdateApplicantInitialInterviewDate(formData: FormData) {
// 	const applicantFormService = new ApplicantStatusService();
// 	return await applicantFormService.updateInitialInterviewDate(formData);
// }

// export async function UpdateApplicantInitialInterviewStatus(formData: FormData) {
// 	const applicantFormService = new ApplicantStatusService();
// 	return await applicantFormService.updateIntialInterviewStatus(formData);
// }
