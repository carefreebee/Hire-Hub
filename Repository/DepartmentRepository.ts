import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { department, DepartmentInsert, office } from "~/lib/schema";

export class DepartmentRepository {
	public async CreateDepartment(departmentCode: string, departmentName: string) {
		try {
			return await db
				.insert(department)
				.values({ department_code: departmentCode, department_name: departmentName })
				.returning();
		} catch (error) {
			console.error("Creating Department failed:", error);
			throw new Error("Creating Department failed");
		}
	}

	async GetAllDepartment() {
		try {
			return await db.query.department.findMany();
		} catch (error) {
			console.error("Fetching Department failed:", error);
			throw new Error("Fetching Department failed");
		}
	}

	async getDepartmentById(id: number) {
		try {
			return await db.query.department.findFirst({ where: eq(department.department_id, id) });
		} catch (error) {
			console.error("Fetching Department by ID failed:", error);
			throw new Error("Fetching Department by ID failed");
		}
	}

	async getDepartmentByCode(code: string) {
		try {
			return await db.query.department.findFirst({ where: eq(department.department_code, code) });
		} catch (error) {
			console.error("Fetching Department by CODE failed:", error);
			throw new Error("Fetching Department by CODE failed");
		}
	}

	public async getDepartmentId(departmentName: string) {
		const departmentId = await db.query.department.findFirst({
			where: eq(department.department_name, departmentName),
		});
		console.log(departmentId);

		if (!departmentId) {
			console.error("Department not found");
			throw new Error("Department not found");
		}

		return departmentId.department_id;
	}

	public async getOfficeId(officeName: string): Promise<number> {
		const officeId = await db.query.office.findFirst({
			where: eq(office.office_name, officeName),
		});

		if (!officeId) {
			console.error("Office not found");
			throw new Error("Office not found");
		}

		return officeId.office_id;
	}

	public async GetDepartmentIdByName(selected_department: string) {
		try {
			const departmentRecord = await db.query.department.findFirst({
				where: eq(department.department_name, selected_department),
			});

			return departmentRecord?.department_id ?? null;
		} catch (error) {
			console.error("Fetching Department ID by Name failed:", error);
			throw new Error("Fetching Department ID by Name failed");
		}
	}

	public async UpdateDepartment({ department_id, department_name }: DepartmentInsert) {
		try {
			return await db
				.update(department)
				.set({ department_name: department_name })
				.where(eq(department.department_id, department_id));
		} catch (error) {
			console.error("Updating Department failed:", error);
			throw new Error("Updating Department failed");
		}
	}

	public async DeleteDepartment(id: number) {
		return await db.delete(department).where(eq(department.department_id, id));
	}
}
