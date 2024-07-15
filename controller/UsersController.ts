"use server";

import { userService } from "~/Dependencies/dependencies";

export async function getUsersByUserID(id: string) {
	return await userService.getUsersByUserID(id);
}

export async function getUserByID(id: string) {
	return await userService.getUserById(id);
}

export async function getUsersByUserRole() {
	return await userService.getUsersByUserRole();
}

export async function getUsersWithoutUserRoles() {
	return await userService.getUsersWithoutUserRoles();
}

export async function getUsersWithDepartment() {
	return await userService.getUsersWithDepartment();
}

export async function getUsersWithOffice() {
	return await userService.getUsersWithOffice();
}

export async function UpdateUserRole(formData: FormData) {
	return await userService.updateUserRole(formData);
}
