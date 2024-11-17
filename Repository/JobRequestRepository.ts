import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { jobRequest } from "~/lib/schema";
import { JobRequest } from "~/validator/JobRequest";

export class JobRequestRepository {
	public async getAllJobRequest() {
		return await db.query.jobRequest.findMany();
	}

	public async getDeptOrOffice(department_id: number | null, office_id: number | null) {
		if (department_id !== null) {
			return await db.query.jobRequest.findMany({
				where: eq(jobRequest.department_id, department_id),
			});
		} else if (office_id !== null) {
			return await db.query.jobRequest.findMany({
				where: eq(jobRequest.office_id, office_id),
			});
		} else {
			return [];
		}
	}

	public async getJobRequestByID(id: number) {
		return await db.query.jobRequest.findFirst({
			where: eq(jobRequest.request_id, id),
		});
	}

	public async createJobRequestDepartment(jobRequestData: JobRequest) {
		await db.insert(jobRequest).values(jobRequestData).returning();
	}
}
