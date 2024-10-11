import { revalidatePath } from "next/cache";
import { DataExtractor } from "~/DataExtractor/ApplicantForm";
import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { ApplicantForm, Validator } from "~/Validator/ApplicantForm";

export class ApplicantFormService {
	constructor(
		private readonly applicantRepo: ApplicantFormRepository,
		private readonly departmentRepo: DepartmentRepository,
		private readonly officeRepo: OfficeRepository
	) {}

	public async getAllApplicantForm() {
		try {
			return await this.applicantRepo.getAllApplicantForm();
		} catch (error) {
			throw new Error("Fetching all applicant form failed");
		}
	}

	public async getAllApplicantByDeptOrOffice(
		department_id: number | null,
		office_id: number | null
	) {
		try {
			return await this.applicantRepo.getAllApplicantByDeptOrOffice(department_id, office_id);
		} catch (error) {
			throw new Error("Fetching applicant by department or office failed");
		}
	}

	public async getApplicantFormByID(id: number) {
		try {
			return await this.applicantRepo.getApplicantFormByID(id);
		} catch (error) {
			throw new Error("Fetching applicant form by ID failed");
		}
	}

	public async create(formData: FormData) {
		const applicantFormData = DataExtractor.extractApplicantFormData(formData);
		this.validateApplicantFormData(applicantFormData);

		const departmentId = await this.departmentRepo.getDepartmentById(
			applicantFormData.department_id
		);
		const officeId = await this.officeRepo.getOfficeById(applicantFormData.office_id);
		console.log("Applicant form data:", applicantFormData);

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
				gender: "male",
				birthday: "",
				address: "",
				province: "",
				city: "",
				baranggay: "",
				civil_stats: "single",
				educational_attainment: "doctorate",
				degree: "",
				job_experience: "entry_level",
			});

			revalidatePath("/dashboard/applicant");
		} catch (error) {
			throw new Error("Database insertion failed");
		}
	}

	private validateApplicantFormData(applicantFormData: ApplicantForm): void {
		const validateData = Validator.validateApplicantFormData(applicantFormData);
		if (!validateData.success) {
			console.error("Validation failed:", validateData.error.format);
			throw new Error("Validation failed");
		}
	}
}
