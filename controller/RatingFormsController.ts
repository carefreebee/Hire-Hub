"use server";

import { ratingFormsService } from "~/Dependencies/dependencies";

export async function getAllRaitingFormById(id: number) {
	return await ratingFormsService.getAllRaitingFormById(id);
}

export async function getAllRaitingFormByIdInEachStages(
	applicantId: number,
	ratingFormId: number[]
) {
	return await ratingFormsService.getAllRaitingFormByIdInEachStages(applicantId, ratingFormId);
}

export async function getAllRatingFormsFilesById(id: number) {
	return await ratingFormsService.getAllRatingFormsFilesById(id);
}

export async function getRatingFormsById(id: number) {
	return await ratingFormsService.getRatingFormsById(id);
}

export async function handleUpdateEvaluateApplicantStatus(formData: FormData) {
	return await ratingFormsService.updateEvaluateApplicantStatus(formData);
}

export async function handleInsertForm(formData: FormData, formType: string) {
	switch (formType) {
		case "initialInterview":
			return await ratingFormsService.createRatingForm(formData);
		case "teachingDemo":
			return await ratingFormsService.teachingDemoForm(formData);
		case "panelInterview":
			return await ratingFormsService.panelInterviewForm(formData);
		default:
			throw new Error("Unknown form type");
	}
}
