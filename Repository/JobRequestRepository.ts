import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { jobRequest } from "~/lib/schema";
import { JobRequest } from "~/Validator/JobRequest";

export class JobRequestRepository {
	public async getAllJobRequest() {
		return await db.query.jobRequest.findMany();
	}

	public async getAllJobRequestByID(id: number) {
		return await db.query.jobRequest.findFirst({
			where: eq(jobRequest.request_id, id),
		});
	}

	public async createJobRequestDepartment(jobRequestData: JobRequest) {
		await db.insert(jobRequest).values(jobRequestData).returning();
	}
}
