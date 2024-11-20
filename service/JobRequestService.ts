import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/extractors/JobRequest";
import { db } from "~/lib/db";
import { jobRequest, JobRequestSelect } from "~/lib/schema";
import { JobRequestRepository } from "~/Repository/JobRequestRepository";
import { EditJobRequest, JobRequest, Validator } from "~/Validator/JobRequest";

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

	public async getJobRequest() {
		try {
			const jobRequest = await this.jobRequestRepo.getAllJobRequest();

			return {
				department: this.department(jobRequest),
				office: this.office(jobRequest),
			};
		} catch (error) {
			console.error("Fetching job requests failed:", error);
			throw new Error("Fetching job requests failed");
		}
	}

	private department(jobRequest: JobRequestSelect[]) {
		return jobRequest
			.filter((department) => department.department_id && department.requested_department)
			.map((department) => ({
				department_id: department.department_id,
				department_name: department.requested_department,
			}));
	}

	private office(jobRequest: JobRequestSelect[]) {
		return jobRequest
			.filter((office) => office.office_id && office.requested_office)
			.map((office) => ({
				office_id: office.office_id,
				office_name: office.requested_office,
			}));
	}

	public async getDeptOrOffice(department_id: number | null, office_id: number | null) {
		try {
			return await this.jobRequestRepo.getDeptOrOffice(department_id, office_id);
		} catch (error) {
			console.error(
				`Fetching job request with ID ${department_id} | ${office_id} failed:`,
				error
			);
			throw new Error(`Fetching job request with ID ${department_id} | ${office_id} failed`);
		}
	}

	public async getJobRequestByID(id: number) {
		try {
			return await this.jobRequestRepo.getJobRequestByID(id);
		} catch (error) {
			console.error(`Fetching job request with ID ${id} failed:`, error);
			throw new Error(`Fetching job request with ID ${id} failed`);
		}
	}

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
			revalidatePath(`/dashboard/request/view/${id}`);
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

	public async approve(formData: FormData) {
		const requestId = formData.get("request_id");
		const jobStatus = formData.get("job_status");
		const updated_by = formData.get("updated_by");

		// Validate request_id
		if (!requestId || isNaN(Number(requestId))) {
			console.error("Validation failed: Invalid request_id");
			throw new Error("Validation failed: Invalid request_id");
		}

		// Validate job_status
		const validStatuses = ["pending", "approved", "denied"];
		if (!jobStatus || !validStatuses.includes(jobStatus as string)) {
			console.error("Validation failed: Invalid job_status");
			throw new Error("Validation failed: Invalid job_status");
		}

		const jobRequestData = {
			request_id: Number(requestId),
			job_status: jobStatus as "pending" | "approved" | "denied",
			updated_by: updated_by as string,
		};

		try {
			const updatedJobRequestData = await db
				.update(jobRequest)
				.set({
					job_status: jobRequestData.job_status,
					updated_by: jobRequestData.updated_by,
				})
				.where(eq(jobRequest.request_id, jobRequestData.request_id));

			console.log("Update successful:", updatedJobRequestData);
			revalidatePath(`/dashboard/request/view/${jobRequestData.request_id}`);
		} catch (error) {
			console.error("Update failed:", error);
			throw new Error("Update failed");
		}
	}

	public async decline(formData: FormData) {
		const requestId = formData.get("request_id");
		const jobStatus = formData.get("job_status");

		// Validate request_id
		if (!requestId || isNaN(Number(requestId))) {
			console.error("Validation failed: Invalid request_id");
			throw new Error("Validation failed: Invalid request_id");
		}

		// Validate job_status
		const validStatuses = ["pending", "approved", "denied"];
		if (!jobStatus || !validStatuses.includes(jobStatus as string)) {
			console.error("Validation failed: Invalid job_status");
			throw new Error("Validation failed: Invalid job_status");
		}

		const jobRequestData = {
			request_id: Number(requestId),
			job_status: jobStatus as "pending" | "approved" | "denied",
		};

		try {
			const updatedJobRequestData = await db
				.update(jobRequest)
				.set({ job_status: jobRequestData.job_status })
				.where(eq(jobRequest.request_id, jobRequestData.request_id));

			console.log("Update successful:", updatedJobRequestData);
			revalidatePath(`/dashboard/request/view/${jobRequestData.request_id}`);
		} catch (error) {
			console.error("Update failed:", error);
			throw new Error("Update failed");
		}
	}
}
