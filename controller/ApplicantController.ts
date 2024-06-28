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

export async function handleSubmitApplicantForm(formData: FormData) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.create(formData);
}

export async function handleUdpateApplicantStatusScreeningDate(formData: FormData) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.updateApplicantStatusScreeningDate(formData);
}

export async function handleUdpateApplicantStatusScreeningStatus(formData: FormData) {
	const applicantFormService = new ApplicantFormService();
	return await applicantFormService.updateApplicantStatusScreeningStatus(formData);
}
