"use server";

import { officeService } from "~/Dependencies/dependencies";

export async function createOffice(formData: FormData) {
	return await officeService.createOffice(formData);
}

export async function getAllOffice() {
	return await officeService.getAllOffice();
}

export async function getOfficeByCode(code: string) {
	return await officeService.getOfficeByCode(code);
}

export async function updateOffice(formData: FormData) {
	return await officeService.updateOffice(formData);
}

export async function deleteOfficeByCode(code: string) {
	return await officeService.deleteOfficeByCode(code);
}
