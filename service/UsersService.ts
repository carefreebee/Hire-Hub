import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/UserRole";
import { DepartmentRepository } from "~/repository/DepartmentRepository";
import { OfficeRepository } from "~/repository/OfficeRepository";
import { UserRepository } from "~/repository/UsersRepository";
import { UserRoleData, Validator } from "~/Validator/Users";
import { RoleEnumsType } from "~/lib/schema";
import { rolesWithoutDeptAndOffice } from "~/types/types";

export class UsersService {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly departmentRepo: DepartmentRepository,
		private readonly officeRepo: OfficeRepository
	) {}

	public async getAllUsers() {
		try {
			return await this.userRepo.getAllUsers();
		} catch (error) {
			console.error("Error during fetching Users:", error);
			throw new Error("Error during fetching Users");
		}
	}

	public async getAllUsersFromDepartment() {
		try {
			return await this.userRepo.getAllUsersFromDepartment();
		} catch (error) {
			console.error("Error during fetching User from Departemnt:", error);
			throw new Error("Error during fetching User from Departemnt");
		}
	}

	public async getAllUsersFromOffice() {
		try {
			return await this.userRepo.getAllUsersFromOffice();
		} catch (error) {
			console.error("Error during fetching User from Office:", error);
			throw new Error("Error during fetching User from Office");
		}
	}

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

	public async getDeptAndOffice() {
		try {
			return await this.userRepo.getDeptAndOffice();
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

		try {
			await this.roleUpdate(userRoleData, id);
			revalidatePath("/admin/users");
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	private async roleUpdate(userRoleData: UserRoleData, id: string) {
		const selectedPosition = userRoleData.selected_position as RoleEnumsType;

		if (selectedPosition === "user") {
			return await this.userRepo.updateUserRoleToUser(selectedPosition as RoleEnumsType, id);
		}

		if (rolesWithoutDeptAndOffice.includes(selectedPosition as RoleEnumsType)) {
			return await this.userRepo.usersWithoutDeptAndOffice(
				selectedPosition as RoleEnumsType,
				id
			);
		}

		const validatedData = this.validateUsersData(userRoleData);
		const { departmentId, officeId } = await this.getDepartmentOrOfficeById(userRoleData);

		await this.userRepo.updateUserRole(validatedData.data, departmentId, officeId, id);
	}

	private async getDepartmentOrOfficeById(userRoleData: UserRoleData) {
		const teachingStaff = userRoleData.selected_option === "teaching_staff";
		const nonTeachingStaff = userRoleData.selected_option === "non-teaching_staff";

		const selectedDepartment = userRoleData.selected_department;
		const selectedOffice = userRoleData.selected_office;

		let departmentId: number | null = null;
		let officeId: number | null = null;

		if (teachingStaff && selectedDepartment) {
			departmentId = await this.departmentRepo.GetDepartmentIdByName(selectedDepartment);
		} else if (nonTeachingStaff && selectedOffice) {
			officeId = await this.officeRepo.GetOfficeIdByName(selectedOffice);
		}

		return { departmentId, officeId };
	}

	private validateUsersData(userRoleData: UserRoleData) {
		const validatedData = Validator.validateUsersData(userRoleData);
		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}
		return validatedData;
	}
}
