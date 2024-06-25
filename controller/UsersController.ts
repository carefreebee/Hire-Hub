"use server";

import { UsersService } from "~/service/UsersService";

export async function getAllUsers() {
	const usersService = new UsersService();
	return await usersService.getAllUsers();
}

export async function getUsersByID(id: number) {
	const usersService = new UsersService();
	return await usersService.getAllUsersByID(id);
}
