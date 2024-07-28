import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { department, DepartmentInsert, office } from "~/lib/schema";

export class DepartmentRepository {
	public async CreateDepartment(departmentCode: string, departmentName: string) {
		return await db
			.insert(department)
			.values({ department_code: departmentCode, department_name: departmentName })
			.returning();
	}

	async GetAllDepartment() {
		return await db.query.department.findMany();
	}

	async getDepartmentById(id: number) {
		return await db.query.department.findFirst({ where: eq(department.department_id, id) });
	}

	async getDepartmentByCode(code: string) {
		return await db.query.department.findFirst({
			where: eq(department.department_code, code),
		});
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
		const departmentRecord = await db.query.department.findFirst({
			where: eq(department.department_name, selected_department),
		});

		return departmentRecord?.department_id ?? null;
	}

	public async UpdateDepartment({ department_id, department_name }: DepartmentInsert) {
		return await db
			.update(department)
			.set({ department_name: department_name })
			.where(eq(department.department_id, department_id));
	}

	public async DeleteDepartmentByCode(departmentCode: string) {
		return await db.delete(department).where(eq(department.department_code, departmentCode));
	}
}
