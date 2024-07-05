import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { ApplicantInsert, applicant, department, office } from "~/lib/schema";

export class ApplicantFormRepository {
	static async getDepartmentId(departmentName: string): Promise<number> {
		const departmentId = await db.query.department.findFirst({
			where: eq(department.department_name, departmentName),
		});

		if (!departmentId) {
			console.error("Department not found");
			throw new Error("Department not found");
		}

		return departmentId.department_id;
	}

	static async getOfficeId(officeName: string): Promise<number> {
		const officeId = await db.query.office.findFirst({
			where: eq(office.office_name, officeName),
		});

		if (!officeId) {
			console.error("Office not found");
			throw new Error("Office not found");
		}

		return officeId.office_id;
	}

	static async createApplicantForm(applicantFormData: ApplicantInsert) {
		try {
			const [createApplicantFormData]: ApplicantInsert[] = await db
				.insert(applicant)
				.values(applicantFormData)
				.returning();

			return createApplicantFormData;
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}
}
