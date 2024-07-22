import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { ApplicantInsert, applicant } from "~/lib/schema";

export class ApplicantFormRepository {
	public async getAllApplicantForm() {
		return await db.query.applicant.findMany();
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
