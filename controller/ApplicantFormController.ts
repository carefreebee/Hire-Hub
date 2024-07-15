"use server";

import { applicantFormService } from "~/Dependencies/dependencies";

export async function getAllApplicantForm() {
	return await applicantFormService.getAllApplicantForm();
}

export async function getApplicantFormByID(id: number) {
	return await applicantFormService.getApplicantFormByID(id);
}

export async function getApplicantCommentByID(id: number) {
	return await applicantFormService.getAllCommentsById(id);
}

export async function CreateApplicantForm(formData: FormData) {
	return await applicantFormService.create(formData);
}
