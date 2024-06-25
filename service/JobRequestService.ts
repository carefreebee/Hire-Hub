import { eq } from "drizzle-orm";
import { DataExtractor } from "~/DataExtractor/JobRequest";
import { JobRequestRepository } from "~/Repository/JobRepository";
import { Validator } from "~/Validator/JobRequest";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";
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
			const [insertedJobRequestData] = await db
				.insert(schema.jobRequest)
				.values(jobRequestData)
				.returning();

			console.log("Job Request Inserted:", insertedJobRequestData);

			const { request_id, requested_category, requested_department, requested_office } =
				insertedJobRequestData;

			let id = null;
			if (requested_category === "teaching_staff" && requested_department) {
				id = await JobRequestRepository.insertDepartment(requested_department);
			} else if (requested_category === "non-teaching_staff" && requested_office) {
				id = await JobRequestRepository.insertOffice(requested_office);
			}

			if (id !== null) {
				let updateFunction;

				if (requested_category === "teaching_staff") {
					updateFunction = JobRequestRepository.updateJobRequestIDDepartment;
				} else if (requested_category === "non-teaching_staff") {
					updateFunction = JobRequestRepository.updateJobRequestIDOffice;
				} else {
					throw new Error("Invalid requested category");
				}

				return await updateFunction(request_id, id);
			}

			return insertedJobRequestData;
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
				.update(schema.jobRequest)
				.set(jobRequestData)
				.where(eq(schema.jobRequest.request_id, id));

			console.log("Update successful:", updatedJobRequestData);
			return updatedJobRequestData;
		} catch (error) {
			console.error("Update failed:", error);
			throw new Error("Update failed");
		}
	}

	async delete(id: number) {
		try {
			await db.delete(schema.jobRequest).where(eq(schema.jobRequest.request_id, id));
			console.log(`Job Request with ID ${id} deleted.`);
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
				where: eq(schema.jobRequest.request_id, id),
			});
		} catch (error) {
			console.error(`Fetching job request with ID ${id} failed:`, error);
			throw new Error(`Fetching job request with ID ${id} failed`);
		}
	}
}
