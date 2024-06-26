"use server";

import { UsersService } from "~/service/UsersService";

export async function getUsersByUserRole() {
	const usersService = new UsersService();
	return await usersService.getUsersByUserRole();
}

export async function getUsersWithoutUserRoles() {
	const usersService = new UsersService();
	return await usersService.getUsersWithoutUserRoles();
}

export async function getUsersByID(id: string) {
	const usersService = new UsersService();
	return await usersService.getAllUsersByID(id);
}

export async function handleUpdateUserRole(formData: FormData) {
	const usersRole = new UsersService();
	return await usersRole.updateUserRole(formData);
}
