"use server";

import { officeService } from "~/Dependencies/dependencies";

export async function createOffice(formData: FormData) {
	return await officeService.createOffice(formData);
}

export async function getAllOffice() {
	return await officeService.getAllOffice();
}

export async function getOfficeById(id: number) {
	return await officeService.getOfficeById(id);
}

export async function updateOffice(formData: FormData) {
	return await officeService.updateOffice(formData);
}

export async function deleteOffice(id: number) {
	return await officeService.deleteOffice(id);
}


