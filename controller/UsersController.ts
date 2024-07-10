"use server";

import { UsersService } from "~/service/UsersService";

export async function getUsersByUserID(id: string) {
	const usersService = new UsersService();
	return await usersService.getUsersByUserID(id);
}

export async function getUserByID(id: string) {
	const usersService = new UsersService();
	return await usersService.getUserById(id);
}

export async function getUsersByUserRole() {
	const usersService = new UsersService();
	return await usersService.getUsersByUserRole();
}

export async function getUsersWithoutUserRoles() {
	const usersService = new UsersService();
	return await usersService.getUsersWithoutUserRoles();
}

export async function getUsersWithDepartment() {
	const usersService = new UsersService();
	return await usersService.getUsersWithDepartment();
}

export async function getUsersWithOffice() {
	const usersService = new UsersService();
	return await usersService.getUsersWithOffice();
}

export async function handleUpdateUserRole(formData: FormData) {
	const usersRole = new UsersService();
	return await usersRole.updateUserRole(formData);
}
