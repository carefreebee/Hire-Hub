import { and, eq, ne } from "drizzle-orm";
import { DataExtractor } from "~/DataExtractor/UserRole";
import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { Validator } from "~/Validator/Users";
import { validateRequest } from "~/lib/auth";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";

export class UsersService {
	async getUsersByUserRole() {
		return await db.select().from(schema.users).where(eq(schema.users.role, "user"));
	}

	async getUsersWithoutUserRoles() {
		const { user } = await validateRequest();

		if (!user) {
			throw new Error("User is null");
		}

		return await db
			.select()
			.from(schema.users)
			.where(and(ne(schema.users.role, "user"), ne(schema.users.id, user.id)));
	}

	async getAllUsersByID(id: string) {
		return await db.query.users.findFirst({
			where: eq(schema.users.id, id),
		});
	}

	async updateUserRole(formData: FormData) {
		const userRoleData = DataExtractor.extractUserRole(formData);
		const id = formData.get("id") as string;
		const validatedData = Validator.validateUsersData(userRoleData);

		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}

		let departmentId = null;
		let officeId = null;

		const teachingStaff = userRoleData.selected_option === "teaching_staff";
		const nonTeachingStaff = userRoleData.selected_option === "non-teaching_staff";

		// Fetch department or office ID based on the selection
		if (teachingStaff && userRoleData.selected_department) {
			departmentId = await ApplicantFormRepository.getDepartmentId(
				userRoleData.selected_department
			);
		} else if (nonTeachingStaff && userRoleData.selected_office) {
			officeId = await ApplicantFormRepository.getOfficeId(userRoleData.selected_office);
		}

		try {
			const udpateUserRole = await db
				.update(schema.users)
				.set({
					...validatedData.data,
					role: validatedData.data.selected_position as schema.RoleEnumsType,
					department_id: departmentId,
					office_id: officeId,
				})
				.where(eq(schema.users.id, id));

			console.log("User role updated successfully:", udpateUserRole);
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}
}
