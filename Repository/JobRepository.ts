import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";

export class JobRequestRepository {
	static async insertDepartment(departmentName: string) {
		const insertDepartmentData = await db
			.insert(schema.department)
			.values({ department_name: departmentName })
			.returning();

		console.log("Department Inserted to the database (Department Table)", insertDepartmentData);

		return insertDepartmentData[0].department_id;
	}

	static async insertOffice(officeName: string) {
		const insertOfficeData = await db
			.insert(schema.office)
			.values({ office_name: officeName })
			.returning();

		console.log("Office Inserted to the database (Office Table)", insertOfficeData);

		return insertOfficeData[0].office_id;
	}

	static async updateJobRequestIDDepartment(requestId: number, departmentId: number) {
		const updatedJobRequestData = await db
			.update(schema.jobRequest)
			.set({ department_id: departmentId })
			.where(eq(schema.jobRequest.request_id, requestId))
			.returning();

		console.log("Job Request Updated with Department ID:", updatedJobRequestData);

		return updatedJobRequestData;
	}

	static async updateJobRequestIDOffice(requestId: number, officeId: number) {
		const updatedJobRequestData = await db
			.update(schema.jobRequest)
			.set({ office_id: officeId })
			.where(eq(schema.jobRequest.request_id, requestId))
			.returning();

		console.log("Job Request Updated with Office ID:", updatedJobRequestData);

		return updatedJobRequestData;
	}

	// GET ALL JOB REQUESTS
	static async getAllJobRequest() {
		try {
			return await db.query.jobRequest.findMany();
		} catch (error) {
			console.error("Failed to fetch job requests:", error);
			throw new Error("Failed to fetch job requests");
		}
	}

	// GET ALL JOB REQUESTS BY ID
	static async getAllJobRequestByID(id: number) {
		try {
			return await db.query.jobRequest.findFirst({
				where: eq(schema.jobRequest.request_id, id),
			});
		} catch (error) {
			console.error("Failed to fetch job requests:", error);
			throw new Error("Failed to fetch job requests");
		}
	}
}
