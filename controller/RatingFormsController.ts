"use server";

import { RatingFormsService } from "~/service/RatingFormsService";

export async function getAllRatingFormsFiles() {
	const ratingFormsService = new RatingFormsService();
	return await ratingFormsService.getAllRatingFormsFiles();
}

export async function getAllRatingFormsFilesById(id: number) {
	const ratingFormsService = new RatingFormsService();
	return await ratingFormsService.getAllRatingFormsFilesById(id);
}

export async function handleUpdateEvaluateApplicantStatus(formData: FormData) {
	const ratingFormsService = new RatingFormsService();
	return await ratingFormsService.updateEvaluateApplicantStatus(formData);
}
