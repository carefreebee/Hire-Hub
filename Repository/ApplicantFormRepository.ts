import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { ApplicantInsert, applicant } from "~/lib/schema";

export class ApplicantFormRepository {
	public async getAllApplicantForm() {
		return await db.query.applicant.findMany();
	}

	public async getAllApplicantByDeptOrOffice(
		department_id: number | null,
		office_id: number | null
	) {
		if (department_id !== null) {
			return await db.query.applicant.findMany({
				where: eq(applicant.department_id, department_id),
			});
		} else if (office_id !== null) {
			return await db.query.applicant.findMany({
				where: eq(applicant.office_id, office_id),
			});
		} else {
			return [];
		}
	}

	public async getApplicantFormByID(id: number) {
		return await db.query.applicant.findFirst({
			where: eq(applicant.id, id),
		});
	}

	public async createApplicantForm(applicantFormData: ApplicantInsert) {
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
