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
		const applicantFormData = DataExtractor.extractApplicantFormData(formData);
		this.validateApplicantFormData(applicantFormData);

		const departmentId = await this.fetchDepartmentId(applicantFormData);
		const officeId = await this.fetchOfficeId(applicantFormData);

		try {
			await ApplicantFormRepository.createApplicantForm({
				...applicantFormData,
				contact_number: Number(applicantFormData.contact_number),
				department_id: departmentId,
				office_id: officeId,
			});

			revalidatePath("/dashboard/applicant");
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

	async getAllCommentsById(id: number) {
		return await db.query.comments.findFirst({
			where: eq(schema.comments.id, id),
		});
	}

	private validateApplicantFormData(applicantFormData: ApplicantForm): void {
		const validateData = Validator.validateApplicantFormData(applicantFormData);
		if (!validateData.success) {
			console.error("Validation failed:", validateData.error.format);
			throw new Error("Validation failed");
		}
	}

	private async fetchDepartmentId(applicantFormData: ApplicantForm): Promise<number | null> {
		if (
			applicantFormData.positionType !== "teaching_staff" ||
			!applicantFormData.selected_department
		) {
			return null;
		}

		try {
			return await ApplicantFormRepository.getDepartmentId(
				applicantFormData.selected_department
			);
		} catch (error) {
			console.error("Error fetching department ID:", error);
			throw new Error("Error fetching department ID");
		}
	}

	private async fetchOfficeId(applicantFormData: ApplicantForm): Promise<number | null> {
		if (
			applicantFormData.positionType !== "non-teaching_staff" ||
			!applicantFormData.selected_office
		) {
			return null;
		}

		try {
			return await ApplicantFormRepository.getOfficeId(applicantFormData.selected_office);
		} catch (error) {
			console.error("Error fetching office ID:", error);
			throw new Error("Error fetching office ID");
		}
	}

	// async updateApplicantStatusScreeningDate(formData: FormData) {
	// 	const applicantStatus = DataExtractor.extractApplicantStagesDate(formData);
	// 	const applicantId = Number(formData.get("applicant_id"));
	// 	const validateData = Validator.validateApplicantStagesDate(applicantStatus);

	// 	if (!validateData.success) {
	// 		console.error("Validation failed:", validateData.error);
	// 		throw new Error("Validation failed");
	// 	}

	// 	console.log(validateData.data.selected_date, applicantId);
	// 	const updatedDate = new Date(validateData.data.selected_date);

	// 	try {
	// 		const currentApplicant = await this.getApplicantFormByID(applicantId);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 						date: updatedDate,
	// 						status: "in-progress",
	// 					},
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, applicantId))
	// 			.returning();

	// 		revalidatePath(`/dashboard/applicant/${applicantId}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	// async updateApplicantStatusScreeningStatus(formData: FormData) {
	// 	const applicantUpdateStatus = {
	// 		applicantId: Number(formData.get("applicant_id")),
	// 		status: formData.get("applicant_status") as "passed" | "failed",
	// 	};

	// 	const allowedStatuses = ["passed", "failed"];

	// 	if (!allowedStatuses.includes(applicantUpdateStatus.status)) {
	// 		throw new Error("Status is required and must be 'passed' or 'failed'");
	// 	}

	// 	try {
	// 		const currentApplicant = await this.getApplicantFormByID(
	// 			applicantUpdateStatus.applicantId
	// 		);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 						status: applicantUpdateStatus.status,
	// 					},
	// 					initial_interview: {
	// 						...currentApplicant.stages?.initial_interview,
	// 						status: "in-progress",
	// 					},
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, applicantUpdateStatus.applicantId))
	// 			.returning();

	// 		revalidatePath(`/dashboard/applicant/${applicantUpdateStatus.applicantId}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	// async createScreeningComment(formData: FormData) {
	// 	const comment = DataExtractor.extractApplicantScreeningComment(formData);
	// 	const validateData = Validator.validateComment(comment);

	// 	if (!validateData.success) {
	// 		console.error("Validation failed:", validateData.error);
	// 		throw new Error("Validation failed");
	// 	}

	// 	try {
	// 		const insertingComment = await db.insert(schema.comments).values(comment).returning();
	// 		const currentApplicant = await this.getApplicantFormByID(comment.applicant_id);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 						comment_id: [
	// 							...(currentApplicant.stages?.screening.comment_id ?? []),
	// 							insertingComment[0].id,
	// 						],
	// 					},
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, comment.applicant_id))
	// 			.returning();

	// 		revalidatePath(`/dashboard/applicant/${comment.applicant_id}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	// async createInitialInterviewComment(formData: FormData) {
	// 	const comment = DataExtractor.extractApplicantScreeningComment(formData);
	// 	const validateData = Validator.validateComment(comment);

	// 	if (!validateData.success) {
	// 		console.error("Validation failed:", validateData.error);
	// 		throw new Error("Validation failed");
	// 	}

	// 	try {
	// 		const insertingComment = await db.insert(schema.comments).values(comment).returning();
	// 		const currentApplicant = await this.getApplicantFormByID(comment.applicant_id);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 					},
	// 					initial_interview: {
	// 						...currentApplicant.stages?.initial_interview,
	// 						comment_id: [
	// 							...(currentApplicant.stages?.initial_interview?.comment_id ?? []),
	// 							insertingComment[0].id,
	// 						],
	// 					},
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, comment.applicant_id))
	// 			.returning();

	// 		revalidatePath(`/dashboard/applicant/${comment.applicant_id}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	// async updateApplicantStatusInitialInterview(formData: FormData) {
	// 	const applicantInitialInterview = DataExtractor.extractApplicantInitialInterview(formData);
	// 	const validateData =
	// 		Validator.validateApplicantStatusInitialInterview(applicantInitialInterview);

	// 	if (!validateData.success) {
	// 		console.error("Validation failed:", validateData.error);
	// 		throw new Error("Validation failed");
	// 	}

	// 	try {
	// 		const currentApplicant = await this.getApplicantFormByID(
	// 			applicantInitialInterview.applicant_id
	// 		);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		const applicantInitialInterviewDatabase = await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 					},
	// 					initial_interview: {
	// 						...currentApplicant.stages?.initial_interview,
	// 						mode: applicantInitialInterview.selected_mode,
	// 						assessed_by: applicantInitialInterview.assessed_by,
	// 						date: new Date(applicantInitialInterview.selected_date),
	// 					},
	// 					// teaching_demo: {
	// 					// 	...currentApplicant.stages?.teaching_demo,
	// 					// 	status: "",
	// 					// },
	// 					// psychological_exam: {
	// 					// 	...currentApplicant.stages?.psychological_exam,
	// 					// 	status: "",
	// 					// },
	// 					// panel_interview: {
	// 					// 	...currentApplicant.stages?.panel_interview,
	// 					// 	status: "",
	// 					// },
	// 					// recommendation_for_hiring: {
	// 					// 	...currentApplicant.stages?.recommendation_for_hiring,
	// 					// 	status: "",
	// 					// },
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, applicantInitialInterview.applicant_id))
	// 			.returning();

	// 		console.log(applicantInitialInterviewDatabase);

	// 		revalidatePath(`/dashboard/applicant/${applicantInitialInterview.applicant_id}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }

	// async createInitialInterviewForm(formData: FormData) {
	// 	const initialInterviewForm = DataExtractor.extractApplicantInitialInterviewForm(formData);
	// 	const validateData = Validator.validateInitialInterviewForm(initialInterviewForm);

	// 	if (!validateData.success) {
	// 		throw new Error("Rate for Initial Interview is required");
	// 	}

	// 	try {
	// 		const insertedRatingForm = await db
	// 			.insert(schema.ratingForms)
	// 			.values(initialInterviewForm)
	// 			.returning();
	// 		const currentApplicant = await this.getApplicantFormByID(
	// 			initialInterviewForm.applicant_id
	// 		);

	// 		console.log(insertedRatingForm);

	// 		if (!currentApplicant) {
	// 			throw new Error("Applicant not found");
	// 		}

	// 		await db
	// 			.update(schema.applicant)
	// 			.set({
	// 				stages: {
	// 					...currentApplicant.stages,
	// 					screening: {
	// 						...currentApplicant.stages?.screening,
	// 					},
	// 					initial_interview: {
	// 						...currentApplicant.stages?.initial_interview,
	// 						rating_forms_id: [
	// 							...(currentApplicant.stages?.initial_interview?.rating_forms_id ??
	// 								[]),
	// 							insertedRatingForm[0].rating_id,
	// 						],
	// 					},
	// 				},
	// 			})
	// 			.where(eq(schema.applicant.id, initialInterviewForm.applicant_id))
	// 			.returning();

	// 			revalidatePath(`/dashboard/applicant/${initialInterviewForm.applicant_id}`);
	// 	} catch (error) {
	// 		console.error("Update Applicant Status failed:", error);
	// 		throw new Error("Update Applicant Status failed");
	// 	}
	// }
}
