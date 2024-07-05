"use server";

import { ApplicantFormService } from "~/service/ApplicantFormService";

export async function getAllApplicantForm() {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.getAllApplicantForm();
}

export async function getApplicantFormByID(id: number) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.getApplicantFormByID(id);
}

export async function getApplicantCommentByID(id: number) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.getAllCommentsById(id);
}

export async function handleSubmitApplicantForm(formData: FormData) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.create(formData);
}

// export async function handleUdpateApplicantStatusScreeningDate(formData: FormData) {
// 	const applicantFormService = new ApplicantFormService();
// 	return await applicantFormService.updateApplicantStatusScreeningDate(formData);
// }

// export async function handleUdpateApplicantStatusScreeningStatus(formData: FormData) {
// 	const applicantFormService = new ApplicantFormService();
// 	return await applicantFormService.updateApplicantStatusScreeningStatus(formData);
// }

// export async function handleUdpateApplicantStatusInitialInterview(formData: FormData) {
// 	const applicantFormService = new ApplicantFormService();
// 	return await applicantFormService.updateApplicantStatusInitialInterview(formData);
// }

// export async function handleSubmitScreeningComment(formData: FormData) {
// 	const applicantFormService = new ApplicantFormService();
// 	return await applicantFormService.createScreeningComment(formData);
// }

// export async function handleSubmitInitialInterviewComment(formData: FormData) {
// 	const commentService = new ApplicantFormService();
// 	return await commentService.createInitialInterviewComment(formData);
// }

// export async function hanldeSubmitInitalInterviewForm(formData: FormData) {
// 	const applicantFormService = new ApplicantFormService();
// 	return await applicantFormService.createInitialInterviewForm(formData);
// }