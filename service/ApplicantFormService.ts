import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/ApplicantForm";
import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { Validator } from "~/Validator/ApplicantForm";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";
import { ApplicantForm } from "~/lib/zod";

export class ApplicantFormService {
	async create(formData: FormData) {
		const applicantFormData: ApplicantForm = DataExtractor.extractApplicantFormData(formData);

		const validateData = Validator.validateApplicantFormData(applicantFormData);

		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error("Validation failed");
		}

		let departmentId = null;
		let officeId = null;

		const teachingStaff = applicantFormData.positionType === "teaching_staff";
		const nonTeachingStaff = applicantFormData.positionType === "non-teaching_staff";

		// Fetch department or office ID based on the selection
		if (teachingStaff && applicantFormData.selected_department) {
			departmentId = await ApplicantFormRepository.getDepartmentId(
				applicantFormData.selected_department
			);
		} else if (nonTeachingStaff && applicantFormData.selected_office) {
			officeId = await ApplicantFormRepository.getOfficeId(applicantFormData.selected_office);
		}

		// Insert validated data into the database
		try {
			const insertApplicantFormData = await db
				.insert(schema.applicant)
				.values({
					...applicantFormData,
					contact_number: Number(applicantFormData.contact_number),
					department_id: departmentId,
					office_id: officeId,
				})
				.returning();

			console.log(
				"Applicant Form Inserted to the database (Applicant Form Table):",
				insertApplicantFormData
			);

			return insertApplicantFormData;
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	async getAllApplicantForm() {
		return await db.query.applicant.findMany();
	}

	async getApplicantFormByID(id: number) {
		return await db.query.applicant.findFirst({
			where: eq(schema.applicant.id, id),
		});
	}

	async updateApplicantStatusScreeningDate(formData: FormData) {
		const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
		const applicantId = Number(formData.get("applicant_id"));
		const validateData = Validator.validateApplicantStagesDate(applicantStatus);

		if (!validateData.success) {
			console.error("Validation failed:", validateData.error);
			throw new Error("Validation failed");
		}

		console.log(validateData.data.selected_date, applicantId);
		const updatedDate = new Date(validateData.data.selected_date);

		try {
			const currentApplicant = await this.getApplicantFormByID(applicantId);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await db
				.update(schema.applicant)
				.set({
					stages: {
						...currentApplicant.stages,
						screening: {
							...currentApplicant.stages?.screening,
							date: updatedDate,
							status: "in-progress",
						},
						initial_interview: {
							...currentApplicant.stages?.initial_interview,
							status: "",
						},
						teaching_demo: {
							...currentApplicant.stages?.teaching_demo,
							status: "",
						},
						psychological_exam: {
							...currentApplicant.stages?.psychological_exam,
							status: "",
						},
						panel_interview: {
							...currentApplicant.stages?.panel_interview,
							status: "",
						},
						recommendation_for_hiring: {
							...currentApplicant.stages?.recommendation_for_hiring,
							status: "",
						},
					},
				})
				.where(eq(schema.applicant.id, applicantId));

			revalidatePath(`/dashboard/applicant/${applicantId}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusScreeningStatus(formData: FormData) {
		const applicantUpdateStatus = {
			applicantId: Number(formData.get("applicant_id")),
			status: formData.get("applicant_status") as "passed" | "failed",
		};

		console.log(applicantUpdateStatus);

		try {
			const currentApplicant = await this.getApplicantFormByID(
				applicantUpdateStatus.applicantId
			);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await db
				.update(schema.applicant)
				.set({
					stages: {
						...currentApplicant.stages,
						screening: {
							...currentApplicant.stages?.screening,
							status: applicantUpdateStatus.status,
						},
						initial_interview: {
							...currentApplicant.stages?.initial_interview,
							status: "in-progress",
						},
						teaching_demo: {
							...currentApplicant.stages?.teaching_demo,
							status: "",
						},
						psychological_exam: {
							...currentApplicant.stages?.psychological_exam,
							status: "",
						},
						panel_interview: {
							...currentApplicant.stages?.panel_interview,
							status: "",
						},
						recommendation_for_hiring: {
							...currentApplicant.stages?.recommendation_for_hiring,
							status: "",
						},
					},
				})
				.where(eq(schema.applicant.id, applicantUpdateStatus.applicantId));

			revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicantId}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}
}
