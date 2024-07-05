import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/DeptOrOfficeUpdatesApplicantForm";
import { Validator } from "~/Validator/DeptOrOfficeUpdatesApplicantForm";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { db } from "~/lib/db";
import { applicant, ratingForms } from "~/lib/schema";

export class DeptOrOfficeUpdatesApplicantStatusService {
	async updateApplicantStatusInitialInterview(formData: FormData) {
		const initialInterviewForm = DataExtractor.extractApplicantInitialInterviewForm(formData);
		const validateData = Validator.validateInitialInterviewForm(initialInterviewForm);

		if (!validateData.success) {
			throw new Error("Rate for Initial Interview is required");
		}

		try {
			const insertedRatingForm = await db
				.insert(ratingForms)
				.values(initialInterviewForm)
				.returning();
			const currentApplicant = await getApplicantFormByID(initialInterviewForm.applicant_id);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await db
				.update(applicant)
				.set({
					stages: {
						...currentApplicant.stages,
						screening: {
							...currentApplicant.stages?.screening,
						},
						initial_interview: {
							...currentApplicant.stages?.initial_interview,
							rating_forms_id: [
								...(currentApplicant.stages?.initial_interview?.rating_forms_id ??
									[]),
								insertedRatingForm[0].rating_id,
							],
						},
					},
				})
				.where(eq(applicant.id, initialInterviewForm.applicant_id))
				.returning();

			revalidatePath(`/dashboard/applicant/${initialInterviewForm.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async updateApplicantStatusTeachingDemo(formData: FormData) {
		const initialInterviewForm = DataExtractor.extractApplicantInitialInterviewForm(formData);
		const validateData = Validator.validateInitialInterviewForm(initialInterviewForm);

		if (!validateData.success) {
			throw new Error("Rate for Initial Interview is required");
		}

		try {
			const insertedRatingForm = await db
				.insert(ratingForms)
				.values(initialInterviewForm)
				.returning();
			const currentApplicant = await getApplicantFormByID(initialInterviewForm.applicant_id);

			console.log(insertedRatingForm);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await db
				.update(applicant)
				.set({
					stages: {
						...currentApplicant.stages,
						screening: {
							...currentApplicant.stages?.screening,
						},
						teaching_demo: {
							...currentApplicant.stages?.teaching_demo,
							rating_forms_id: [
								...(currentApplicant.stages?.teaching_demo?.rating_forms_id ?? []),
								insertedRatingForm[0].rating_id,
							],
						},
					},
				})
				.where(eq(applicant.id, initialInterviewForm.applicant_id))
				.returning();

			revalidatePath(`/dashboard/applicant/${initialInterviewForm.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}
}
