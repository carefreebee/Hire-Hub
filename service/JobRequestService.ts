import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/JobRequest";
import { JobRequestRepository } from "~/Repository/JobRequestRepository";
import { EditJobRequest, JobRequest, Validator } from "~/Validator/JobRequest";
import { db } from "~/lib/db";
import { jobRequest } from "~/lib/schema";

export class JobRequestService {
	constructor(private readonly jobRequestRepo: JobRequestRepository) {}

	public async getAllJobRequest() {
		try {
			return await this.jobRequestRepo.getAllJobRequest();
		} catch (error) {
			console.error("Fetching all job requests failed:", error);
			throw new Error("Fetching all job requests failed");
		}
	}

	public async getAllJobRequestByID(id: number) {
		try {
			return await this.jobRequestRepo.getAllJobRequestByID(id);
		} catch (error) {
			console.error(`Fetching job request with ID ${id} failed:`, error);
			throw new Error(`Fetching job request with ID ${id} failed`);
		}
	}

	// NEED UPDATE: MAKE SURE TO CHANGE THE CATEGORY INSTEAD OF DROPDOWN,
	// MAKE IT STATIC BASED ON WHAT THE USER IS CURRENTLY AT,
	// WHETHER THE USER IS AT THE DEPARTMENT/OFFICE.
	public async create(formData: FormData) {
		const jobRequestData: JobRequest = DataExtractor.extractJobRequestData(formData);

		const validatedData = Validator.validateJobRequestData(jobRequestData);

		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}

		try {
			await db.insert(jobRequest).values(jobRequestData).returning();

			revalidatePath("/department/request");
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	public async edit(formData: FormData) {
		const jobRequestData: EditJobRequest = DataExtractor.extractEditJobRequestData(formData);
		const id = Number(formData.get("request_id"));
		const validatedData = Validator.validateEditJobRequestData(jobRequestData);

		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}

		try {
			const updatedJobRequestData = await db
				.update(jobRequest)
				.set(jobRequestData)
				.where(eq(jobRequest.request_id, id));

			console.log("Update successful:", updatedJobRequestData);
			revalidatePath(`/dashboard/request/result/${id}`);
		} catch (error) {
			console.error("Update failed:", error);
			throw new Error("Update failed");
		}
	}

	public async delete(id: number) {
		try {
			await db.delete(jobRequest).where(eq(jobRequest.request_id, id));

			revalidatePath("/dashboard/request");
		} catch (error) {
			console.error("Deletion failed:", error);
			throw new Error("Deletion failed");
		}
	}
}
