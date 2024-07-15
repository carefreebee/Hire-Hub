"use server";

import { jobRequestService } from "~/Dependencies/dependencies";

// @Controller("/job-request")
export async function getAllJobRequest() {
	return await jobRequestService.getAllJobRequest();
}

export async function getAllJobRequestByID(id: number) {
	return await jobRequestService.getAllJobRequestByID(id);
}

// NEED UPDATE: MAKE SURE TO CHANGE THE CATEGORY INSTEAD OF DROPDOWN,
// MAKE IT STATIC BASED ON WHAT THE USER IS CURRENTLY AT,
// WHETHER THE USER IS AT THE DEPARTMENT/OFFICE.
// UPDATE ALL THE FUNCTIONS BELOW
export async function handleSubmitJobRequest(formData: FormData) {
	return await jobRequestService.create(formData);
}

export async function handleEditJobRequest(formData: FormData) {
	return await jobRequestService.edit(formData);
}

export async function handleDeleteJobRequest(id: number) {
	return await jobRequestService.delete(id);
}
