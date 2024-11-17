"use server";

import { jobRequestService } from "~/dependencies/dependencies";

// @Controller("/job-request")
export async function getAllJobRequest() {
	return await jobRequestService.getAllJobRequest();
}

export async function getJobRequest() {
	return await jobRequestService.getJobRequest();
}

export async function getJobReqByDeptOrOffice(
	department_id: number | null,
	office_id: number | null
) {
	return await jobRequestService.getDeptOrOffice(department_id, office_id);
}

export async function getJobRequestByID(id: number) {
	return await jobRequestService.getJobRequestByID(id);
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
