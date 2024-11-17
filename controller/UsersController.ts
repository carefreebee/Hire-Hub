"use server";

import { userService } from "~/Dependencies/dependencies";

export async function getAllUsers() {
	return await userService.getAllUsers();
}

export async function getAllUsersFromDepartment() {
	return await userService.getAllUsersFromDepartment();
}

export async function getAllUsersFromOffice() {
	return await userService.getAllUsersFromOffice();
}

export async function getUsersByUserID(id: string) {
	return await userService.getUsersByUserID(id);
}

export async function getUserByID(id: string) {
	return await userService.getUserById(id);
}

export async function getUsersByUserRole() {
	return await userService.getUsersByUserRole();
}

export async function getDeptAndOffice() {
	return await userService.getDeptAndOffice();
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
