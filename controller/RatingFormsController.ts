"use server";

import { ratingFormsService } from "~/Dependencies/dependencies";

export async function getAllRatingFormsFilesById(id: number) {
	return await ratingFormsService.getAllRatingFormsFilesById(id);
}

export async function getRatingFormsById(id: number) {
	return await ratingFormsService.getRatingFormsById(id);
}

export async function handleUpdateEvaluateApplicantStatus(formData: FormData) {
	return await ratingFormsService.updateEvaluateApplicantStatus(formData);
}
