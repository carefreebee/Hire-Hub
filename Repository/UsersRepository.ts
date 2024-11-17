import { and, eq, isNotNull, ne } from "drizzle-orm";
import { db } from "~/lib/db";
import { RoleEnumsType, users } from "~/lib/schema";
import { UserRoleData } from "~/validator/Users";

export class UserRepository {
	// HELPER FUNCTION
	private queryUser() {
		return db.query.users;
	}

	public async getAllUsers() {
		return await this.queryUser().findMany();
	}

	public async getAllUsersFromDepartment() {
		return await this.queryUser().findMany({ where: isNotNull(users.department_id) });
	}

	public async getAllUsersFromOffice() {
		return await this.queryUser().findMany({ where: isNotNull(users.office_id) });
	}

	public async getUsersByUserID(id: string) {
		return await this.queryUser().findMany({ where: eq(users.id, id) });
	}

	public async getUserById(id: string) {
		return await this.queryUser().findFirst({
			where: eq(users.id, id),
		});
	}

	public async getUsersByUserRole() {
		return await this.queryUser().findMany({ where: eq(users.role, "user") });
	}

	public async getDeptAndOffice() {
		return {
			department: await db.query.department.findMany(),
			office: await db.query.office.findMany(),
		};
	}

	public async getUsersWithoutUserRoles() {
		const user = await this.queryUser().findMany({
			where: and(ne(users.role, "user"), ne(users.role, "admin")),
		});

		return user.map((user) => ({
			id: user.id,
			name: user.name,
			role: user.role,
		}));
	}

	public async getUsersWithDepartment() {
		return await this.queryUser().findMany({ where: isNotNull(users.department_id) });
	}

	public async getUsersWithOffice() {
		return await this.queryUser().findMany({ where: isNotNull(users.office_id) });
	}

	public async usersWithoutDeptAndOffice(role: RoleEnumsType, id: string) {
		return await db.update(users).set({ role: role }).where(eq(users.id, id));
	}

	public async updateUserRoleToUser(role: RoleEnumsType, id: string) {
		return await db
			.update(users)
			.set({
				role,
				department_id: null,
				selected_department: null,
				office_id: null,
				selected_office: null,
			})
			.where(eq(users.id, id));
	}

	public async updateUserRole(
		validatedData: UserRoleData,
		departmentId: number | null,
		officeId: number | null,
		id: string
	) {
		return await db
			.update(users)
			.set({
				...validatedData,
				role: validatedData.selected_position as RoleEnumsType,
				department_id: departmentId,
				office_id: officeId,
			})
			.where(eq(users.id, id));
	}
}
