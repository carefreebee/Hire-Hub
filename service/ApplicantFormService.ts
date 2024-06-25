import { eq } from "drizzle-orm";
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

	async getAllApplicantFormByID(id: number) {
		return await db.query.applicant.findFirst({
			where: eq(schema.applicant.id, id),
		});
	}
}
