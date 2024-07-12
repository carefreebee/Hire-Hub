import { eq } from "drizzle-orm";
import { getDepartmentById } from "~/controller/DepartmentOrOfficeController";
import { db } from "~/lib/db";
import { department, jobRequest, JobRequestInsert, office } from "~/lib/schema";

export class JobRequestRepository {
	static async createJobRequest(jobRequestData: JobRequestInsert) {
		// PLEASE UPDATE THE CODE BELOW INSERTION WILL BE DONE IN ADMIN SIDE
		// THIS CLASS MUST DO UPDATE ONLY BASED ON THE REQUESTED CATEGORY ON THE FRONTEND
		// const [insertedJobRequestData] = await db
		// 	.insert(jobRequest)
		// 	.values(jobRequestData)
		// 	.returning();

		// const { request_id, requested_category, requested_department, requested_office } =
		// 	insertedJobRequestData;

		// let id: number | null = null;
		// if (requested_category === "teaching_staff" && requested_department !== null) {
		// 	const [insertedDepartment] = await this.insertDepartment(requested_department);
		// 	id = insertedDepartment.department_id;
		// 	await this.updateDepartmentJobRequest(id, request_id);
		// } else if (requested_category === "non-teaching_staff" && requested_office !== null) {
		// 	const [insertedOffice] = await this.insertOffice(requested_office);
		// 	id = insertedOffice.office_id;
		// 	await this.updateOfficeRequest(id, request_id);
		// }
		// if (requested_category === "teaching_staff" && requested_department === null) {
		// 	const requestedDepartment = jobRequest.requested_department;
		// 	await db.insert(department).values
		// } else if (requested_category === "non-teaching_staff" && requested_office === null) {
		// 	const requestedOffice = jobRequest.requested_office;
		// }
		// const get = await getDepartmentById(1);
		// if (jobRequestData.requested_category === "teaching_staff") {
		// 	await db.insert(jobRequest).values()
		// }
	}

	static async insertDepartment(requested_department: string) {
		return await db
			.insert(department)
			.values({ department_name: requested_department })
			.returning();
	}

	static async insertOffice(requested_office: string) {
		return db.insert(office).values({ office_name: requested_office }).returning();
	}

	static async updateDepartmentJobRequest(id: number, request_id: number) {
		return await db
			.update(jobRequest)
			.set({ department_id: id })
			.where(eq(jobRequest.request_id, request_id))
			.returning();
	}

	static async updateOfficeRequest(id: number, request_id: number) {
		return await db
			.update(jobRequest)
			.set({ office_id: id })
			.where(eq(jobRequest.request_id, request_id))
			.returning();
	}
}
