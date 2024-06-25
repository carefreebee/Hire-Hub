import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";

export class ApplicantFormRepository {
	static async getDepartmentId(departmentName: string): Promise<number> {
		const department = await db.query.department.findFirst({
			where: eq(schema.department.department_name, departmentName),
		});

		if (!department) {
			console.error("Department not found");
			throw new Error("Department not found");
		}

		return department.department_id;
	}

	static async getOfficeId(officeName: string): Promise<number> {
		const office = await db.query.office.findFirst({
			where: eq(schema.office.office_name, officeName),
		});

		if (!office) {
			console.error("Office not found");
			throw new Error("Office not found");
		}

		return office.office_id;
	}
}
