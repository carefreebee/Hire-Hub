import { and, eq, isNotNull, ne } from "drizzle-orm";
import { DataExtractor } from "~/DataExtractor/UserRole";
import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { Validator } from "~/Validator/Users";
import { db } from "~/lib/db";
import { RoleEnumsType, users } from "~/lib/schema";
import { Users } from "~/lib/zod";
import { rolesWithoutDeptAndOffice } from "~/types/types";

export class UsersService {
	// HELPER FUNCTION
	private queryUser() {
		return db.query.users;
	}

	async getUsersByUserID(id: string) {
		try {
			const result = await this.queryUser().findMany({ where: eq(users.id, id) });
			return result;
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUsersByUserID");
		}
	}

	async getUserById(id: string) {
		try {
			return await this.queryUser().findFirst({
				where: eq(users.id, id),
			});
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUserById");
		}
	}

	async getUsersByUserRole() {
		try {
			return await this.queryUser().findMany({ where: eq(users.role, "user") });
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUsersByUserRole");
		}
	}

	async getUsersWithoutUserRoles() {
		try {
			return await this.queryUser().findMany({
				where: and(ne(users.role, "user"), ne(users.role, "admin")),
			});
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUsersWithoutUserRoles");
		}
	}

	async getUsersWithDepartment() {
		try {
			return await db.query.users.findMany({ where: isNotNull(users.department_id) });
		} catch (error) {
			console.error("Error in getUsersWithDepartment:", error);
			throw new Error("Error in getUsersWithDepartment");
		}
	}

	async getUsersWithOffice() {
		try {
			return await db.query.users.findMany({ where: isNotNull(users.office_id) });
		} catch (error) {
			console.error("Error in getUsersWithOffice:", error);
			throw new Error("Error in getUsersWithOffice");
		}
	}

	async updateUserRole(formData: FormData) {
		const userRoleData = DataExtractor.extractUserRole(formData);
		const id = formData.get("id") as string;

		if (rolesWithoutDeptAndOffice.includes(userRoleData.selected_position as RoleEnumsType)) {
			return await db
				.update(users)
				.set({ role: userRoleData.selected_position as RoleEnumsType })
				.where(eq(users.id, id));
		}

		const validatedData = this.validateUsersData(userRoleData);

		const teachingStaff = userRoleData.selected_option === "teaching_staff";
		const nonTeachingStaff = userRoleData.selected_option === "non-teaching_staff";

		let departmentId: number | null = null;
		let officeId: number | null = null;

		if (teachingStaff && userRoleData.selected_department) {
			departmentId = await ApplicantFormRepository.getDepartmentId(
				userRoleData.selected_department
			);
		} else if (nonTeachingStaff && userRoleData.selected_office) {
			officeId = await ApplicantFormRepository.getOfficeId(userRoleData.selected_office);
		}

		try {
			const udpateUserRole = await db
				.update(users)
				.set({
					...validatedData.data,
					role: validatedData.data.selected_position as RoleEnumsType,
					department_id: departmentId,
					office_id: officeId,
				})
				.where(eq(users.id, id));

			console.log("User role updated successfully:", udpateUserRole);
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	private validateUsersData(userRoleData: Users) {
		const validatedData = Validator.validateUsersData(userRoleData);
		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}
		return validatedData;
	}
}
