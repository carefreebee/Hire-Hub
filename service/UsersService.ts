import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/UserRole";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { UserRepository } from "~/Repository/UsersRepository";
import { Users, Validator } from "~/Validator/Users";
import { RoleEnumsType } from "~/lib/schema";
import { rolesWithoutDeptAndOffice } from "~/types/types";

export class UsersService {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly departmentRepo: DepartmentRepository,
		private readonly officeRepo: OfficeRepository
	) {}

	public async getUsersByUserID(id: string) {
		try {
			return await this.userRepo.getUsersByUserID(id);
		} catch (error) {
			console.error("Error during fetching User by ID:", error);
			throw new Error("Error during fetching User by ID");
		}
	}

	public async getUserById(id: string) {
		try {
			return await this.userRepo.getUserById(id);
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUserById");
		}
	}

	public async getUsersByUserRole() {
		try {
			return await this.userRepo.getUsersByUserRole();
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUsersByUserRole");
		}
	}

	public async getUsersWithoutUserRoles() {
		try {
			return await this.userRepo.getUsersWithoutUserRoles();
		} catch (error) {
			console.error("Error in getUsersByUserID:", error);
			throw new Error("Error in getUsersWithoutUserRoles");
		}
	}

	public async getUsersWithDepartment() {
		try {
			return await this.userRepo.getUsersWithDepartment();
		} catch (error) {
			console.error("Error in getUsersWithDepartment:", error);
			throw new Error("Error in getUsersWithDepartment");
		}
	}

	public async getUsersWithOffice() {
		try {
			return await this.userRepo.getUsersWithOffice();
		} catch (error) {
			console.error("Error in getUsersWithOffice:", error);
			throw new Error("Error in getUsersWithOffice");
		}
	}

	public async updateUserRole(formData: FormData) {
		const userRoleData = DataExtractor.extractUserRole(formData);
		const id = formData.get("id") as string;

		if (userRoleData.selected_position === "user") {
			return await this.userRepo.updateUserRoleToUser(
				userRoleData.selected_position as RoleEnumsType,
				id
			);
		} else if (
			rolesWithoutDeptAndOffice.includes(userRoleData.selected_position as RoleEnumsType)
		) {
			return await this.userRepo.usersWithoutDeptAndOffice(
				userRoleData.selected_position as RoleEnumsType,
				id
			);
		}

		const validatedData = this.validateUsersData(userRoleData);

		const teachingStaff = userRoleData.selected_option === "teaching_staff";
		const nonTeachingStaff = userRoleData.selected_option === "non-teaching_staff";

		let departmentId: number | null = null;
		let officeId: number | null = null;

		if (teachingStaff && userRoleData.selected_department) {
			departmentId = await this.departmentRepo.GetDepartmentIdByName(
				userRoleData.selected_department
			);
		} else if (nonTeachingStaff && userRoleData.selected_office) {
			officeId = await this.officeRepo.GetOfficeIdByName(userRoleData.selected_office);
		}

		try {
			await this.userRepo.updateUserRole(validatedData.data, departmentId, officeId, id);
			revalidatePath("/admin/users/manage-users");
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
