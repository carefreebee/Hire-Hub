"use server";

import { DepartmentOrOfficeService } from "~/service/DepartmentOrOfficeService";

// START OF DEPARTMENT

export async function createDepartment(formData: FormData) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.createDepartment(formData);
}

export async function getAllDepartment() {
	const department = new DepartmentOrOfficeService();
	return await department.getAllDepartment();
}

export async function getDepartmentById(id: number) {
	const department = new DepartmentOrOfficeService();
	return await department.getDepartmentById(id);
}

export async function updateDepartment(formData: FormData) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.updateDepartment(formData);
}

export async function deleteDepartment(id: number) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.deleteDepartment(id);
}

// END OF DEPARTMENT

// START OF OFFICE

export async function createOffice(formData: FormData) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.createOffice(formData);
}

export async function getAllOffice() {
	const office = new DepartmentOrOfficeService();
	return await office.getAllOffice();
}

export async function getOfficeById(id: number) {
	const department = new DepartmentOrOfficeService();
	return await department.getOfficeById(id);
}

export async function updateOffice(formData: FormData) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.updateOffice(formData);
}

export async function deleteOffice(id: number) {
	const departmentOrOfficeService = new DepartmentOrOfficeService();
	return await departmentOrOfficeService.deleteOffice(id);
}

// END OF OFFICE

// export async function handleCreateDepartmentOrOffice(formData: FormData) {
// 	const departmentOrOfficeService = new DepartmentOrOfficeService();
// 	return await departmentOrOfficeService.create(formData);
// }

// export async function getAllMergeDepartmentOrOffice() {
// 	const departmentOrOfficeService = new DepartmentOrOfficeService();
// 	return await departmentOrOfficeService.readMerge();
// }
