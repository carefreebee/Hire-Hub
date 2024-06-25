"use server";

import { revalidatePath } from "next/cache";
import { JobRequestService } from "~/service/JobRequestService";

// @Controller("/job-request")
export async function getAllJobRequest() {
	// Calling the JobRequestService class in the controller
	const jobService = new JobRequestService();
	return await jobService.getAllJobRequest();
}

export async function getAllJobRequestByID(id: number) {
	// Calling the JobRequestService class in the controller
	const jobService = new JobRequestService();
	return await jobService.getAllJobRequestByID(id);
}

export async function handleSubmitJobRequest(formData: FormData) {
	// Calling the JobRequestService class in the controller
	const jobService = new JobRequestService();
	revalidatePath("/dashboard/request");
	return await jobService.create(formData);
}

export async function handleEditJobRequest(formData: FormData) {
	// Calling the JobRequestService class in the controller
	const jobService = new JobRequestService();
	revalidatePath("/dashboard/request");
	return await jobService.edit(formData);
}

export async function handleDeleteJobRequest(id: number) {
	// Calling the JobRequestService class in the controller
	const jobService = new JobRequestService();
	revalidatePath("/dashboard/request");
	return await jobService.delete(id);
}
