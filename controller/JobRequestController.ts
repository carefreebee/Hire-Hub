"use server";

import { JobRequestService } from "~/service/JobRequestService";

// @Controller("/job-request")
export async function getAllJobRequest() {
	const jobService = new JobRequestService();
	return await jobService.getAllJobRequest();
}

export async function getAllJobRequestByID(id: number) {
	const jobService = new JobRequestService();
	return await jobService.getAllJobRequestByID(id);
}

export async function handleSubmitJobRequest(formData: FormData) {
	const jobService = new JobRequestService();
	return await jobService.create(formData);
}

export async function handleEditJobRequest(formData: FormData) {
	const jobService = new JobRequestService();
	return await jobService.edit(formData);
}

// export async function handleDeleteJobRequest(formData: FormData) {
// 	const jobService = new JobRequestService();
// 	return await jobService.delete(formData);
// }

export async function handleDeleteJobRequest(id: number) {
	const jobService = new JobRequestService();
	return await jobService.delete(id);
}
