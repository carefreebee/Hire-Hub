"use server";

import { departmentService } from "~/Dependencies/dependencies";

export async function createDepartment(formData: FormData) {
	return await departmentService.createDepartment(formData);
}

export async function getAllDepartment() {
	return await departmentService.getAllDepartment();
}

export async function getDepartmentById(id: number) {
	return await departmentService.getDepartmentById(id);
}

export async function updateDepartment(formData: FormData) {
	return await departmentService.updateDepartment(formData);
}

export async function deleteDepartment(id: number) {
	return await departmentService.deleteDepartment(id);
}
