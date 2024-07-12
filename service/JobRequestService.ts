import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/JobRequest";
import { Validator } from "~/Validator/JobRequest";
import { db } from "~/lib/db";
import { jobRequest } from "~/lib/schema";
import { EditJobRequest, JobRequest } from "~/lib/zod";

export class JobRequestService {
	async create(formData: FormData) {
		// Extract and structure data from formData
		const jobRequestData: JobRequest = DataExtractor.extractJobRequestData(formData);

		// Validate the structured data
		const validatedData = Validator.validateJobRequestData(jobRequestData);

		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}

		// Insert validated data into the database
		try {
			// await JobRequestRepository.createJobRequest(jobRequestData);
			// console.log("Job request data:", jobRequestData);
			if (jobRequestData.requested_category === "teaching_staff") {
				await db.insert(jobRequest).values(jobRequestData).returning();
			}
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	async edit(formData: FormData) {
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

	// async delete(formData: FormData) {
	// 	try {
	// 		const jobRequestId = {
	// 			request_id: Number(formData.get("request_id")),
	// 		};

	// 		await db
	// 			.delete(jobRequest)
	// 			.where(eq(jobRequest.request_id, jobRequestId.request_id));

	// 		revalidatePath("/dashboard/request");
	// 	} catch (error) {
	// 		console.error("Deletion failed:", error);
	// 		throw new Error("Deletion failed");
	// 	}
	// }
	async delete(id: number) {
		try {
			await db.delete(jobRequest).where(eq(jobRequest.request_id, id));

			revalidatePath("/dashboard/request");
		} catch (error) {
			console.error("Deletion failed:", error);
			throw new Error("Deletion failed");
		}
	}

	async getAllJobRequest() {
		try {
			return await db.query.jobRequest.findMany();
		} catch (error) {
			console.error("Fetching all job requests failed:", error);
			throw new Error("Fetching all job requests failed");
		}
	}

	async getAllJobRequestByID(id: number) {
		try {
			return await db.query.jobRequest.findFirst({
				where: eq(jobRequest.request_id, id),
			});
		} catch (error) {
			console.error(`Fetching job request with ID ${id} failed:`, error);
			throw new Error(`Fetching job request with ID ${id} failed`);
		}
	}
}
