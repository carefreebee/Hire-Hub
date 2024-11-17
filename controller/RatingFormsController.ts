"use server";

import { ratingFormsService } from "~/dependencies/dependencies";

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
