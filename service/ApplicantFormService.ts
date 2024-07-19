import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/ApplicantForm";
import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { CommentRepository } from "~/Repository/CommentRepository";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { ApplicantForm, Validator } from "~/Validator/ApplicantForm";

export class ApplicantFormService {
	constructor(
		private readonly applicantRepo: ApplicantFormRepository,
		private readonly departmentRepo: DepartmentRepository,
		private readonly officeRepo: OfficeRepository,
		private readonly commentRepo: CommentRepository
	) {}

	public async create(formData: FormData) {
		const applicantFormData = DataExtractor.extractApplicantFormData(formData);
		this.validateApplicantFormData(applicantFormData);

		const departmentId = await this.departmentRepo.getDepartmentById(
			applicantFormData.department_id
		);
		const officeId = await this.officeRepo.getOfficeById(applicantFormData.office_id);

		try {
			await this.applicantRepo.createApplicantForm({
				...applicantFormData,
				contact_number: Number(applicantFormData.contact_number),
				department_id: departmentId?.department_id,
				office_id: officeId?.office_id,
				resume: {
					resume_name: applicantFormData.resume_name,
					resume_url: applicantFormData.resume_url,
					letter_name: applicantFormData.letter_name,
					letter_url: applicantFormData.letter_url,
				},
			});
			console.log("Applicant form data:", applicantFormData);

			revalidatePath("/dashboard/applicant");
		} catch (error) {
			console.error("Database insertion failed:", error);
			throw new Error("Database insertion failed");
		}
	}

	public async getAllApplicantForm() {
		return await this.applicantRepo.getAllApplicantForm();
	}

	public async getApplicantFormByID(id: number) {
		return await this.applicantRepo.getApplicantFormByID(id);
	}

	public async getAllCommentsById(id: number) {
		return await this.commentRepo.getAllCommentsById(id);
	}

	private validateApplicantFormData(applicantFormData: ApplicantForm): void {
		const validateData = Validator.validateApplicantFormData(applicantFormData);
		if (!validateData.success) {
			console.error("Validation failed:", validateData.error.format);
			throw new Error("Validation failed");
		}
	}
}
