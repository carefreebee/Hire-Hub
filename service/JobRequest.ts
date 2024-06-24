import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
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
			const insertJobRequestData = await db
				.insert(schema.jobRequest)
				.values(jobRequestData)
				.returning();

			console.log(
				"Job Request Inserted to the database (Job Request Table):",
				insertJobRequestData
			);

			// CHECK IF A DEPARTMENT NEEDS TO BE INSERTED
			let departmentId = null;
			// CHECK IF AN OFFICE NEEDS TO BE INSERTED
			let officeId = null;

			if (
				insertJobRequestData[0].requested_department &&
				jobRequestData.requested_category === "teaching_staff"
			) {
				departmentId = await JobRequestRepository.insertDepartment(
					insertJobRequestData[0].requested_department
				);
			} else if (
				insertJobRequestData[0].requested_office &&
				jobRequestData.requested_category === "non-teaching_staff"
			) {
				officeId = await JobRequestRepository.insertOffice(
					insertJobRequestData[0].requested_office
				);
			}

			// UPDATE THE JOB REQUEST WITH THE DEPARTMENT ID OR OFFICE ID
			if (departmentId !== null) {
				const updatedJobRequestData =
					await JobRequestRepository.updateJobRequestIDDepartment(
						insertJobRequestData[0].request_id,
						departmentId
					);

				return updatedJobRequestData;
			} else if (officeId !== null) {
				const updatedJobRequestData = await JobRequestRepository.updateJobRequestIDOffice(
					insertJobRequestData[0].request_id,
					officeId
				);

				return updatedJobRequestData;
			}

			return insertJobRequestData;
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	async edit(formData: FormData) {
		// Extract and structure data from formData
		const jobRequestData: EditJobRequest = DataExtractor.extractEditJobRequestData(formData);
		const id = Number(formData.get("request_id"));

		// Validate the structured data
		const validatedData = Validator.validateEditJobRequestData(jobRequestData);

		if (!validatedData.success) {
			console.error("Validation failed:", validatedData.error);
			throw new Error("Validation failed");
		}

		const updatedJobRequestData = await db
			.update(schema.jobRequest)
			.set({ ...jobRequestData })
			.where(eq(schema.jobRequest.request_id, id));

		console.log("Update: ", validatedData);
		return updatedJobRequestData;
	}

	async delete(id: number) {
		return await db.delete(schema.jobRequest).where(eq(schema.jobRequest.request_id, id));
	}

	async getAllJobRequest() {
		return JobRequestRepository.getAllJobRequest();
	}

	async getAllJobRequestByID(id: number) {
		return JobRequestRepository.getAllJobRequestByID(id);
	}
}
