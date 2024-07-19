"use server";

import { jobRequestService } from "~/Dependencies/dependencies";

// @Controller("/job-request")
export async function getAllJobRequest() {
	return await jobRequestService.getAllJobRequest();
}

export async function getAllJobRequestByID(id: number) {
	return await jobRequestService.getAllJobRequestByID(id);
}

export async function handleSubmitJobRequest(formData: FormData) {
	return await jobRequestService.create(formData);
}

export async function handleEditJobRequest(formData: FormData) {
	return await jobRequestService.edit(formData);
}

export async function handleDeleteJobRequest(id: number) {
	return await jobRequestService.delete(id);
}
