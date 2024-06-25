import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";

export class JobRequestRepository {
	static async insertDepartment(departmentName: string) {
		try {
			const insertDepartmentData = await db
				.insert(schema.department)
				.values({ department_name: departmentName })
				.returning();

			console.log(
				"Department Inserted to the database (Department Table)",
				insertDepartmentData
			);

			return insertDepartmentData[0].department_id;
		} catch (error) {
			console.error("Failed to insert department:", error);
			throw new Error("Department insertion failed");
		}
	}

	static async insertOffice(officeName: string) {
		try {
			const insertOfficeData = await db
				.insert(schema.office)
				.values({ office_name: officeName })
				.returning();

			console.log("Office Inserted to the database (Office Table)", insertOfficeData);

			return insertOfficeData[0].office_id;
		} catch (error) {
			console.error("Failed to insert office:", error);
			throw new Error("Office insertion failed");
		}
	}

	static async updateJobRequestIDDepartment(requestId: number, departmentId: number) {
		try {
			const updatedJobRequestData = await db
				.update(schema.jobRequest)
				.set({ department_id: departmentId })
				.where(eq(schema.jobRequest.request_id, requestId))
				.returning();

			console.log("Job Request Updated with Department ID:", updatedJobRequestData);

			return updatedJobRequestData;
		} catch (error) {
			console.error("Failed to update job request with department ID:", error);
			throw new Error("Updating job request with department ID failed");
		}
	}

	static async updateJobRequestIDOffice(requestId: number, officeId: number) {
		try {
			const updatedJobRequestData = await db
				.update(schema.jobRequest)
				.set({ office_id: officeId })
				.where(eq(schema.jobRequest.request_id, requestId))
				.returning();

			console.log("Job Request Updated with Office ID:", updatedJobRequestData);

			return updatedJobRequestData;
		} catch (error) {
			console.error("Failed to update job request with office ID:", error);
			throw new Error("Updating job request with office ID failed");
		}
	}
}
