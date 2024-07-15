import { revalidatePath } from "next/cache";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { Validator } from "~/Validator/Office";

export class OfficeService {
	constructor(private readonly officeRepo: OfficeRepository) {}

	public async createOffice(formData: FormData) {
		const officeName = {
			office_name: formData.get("office_name") as string,
		};
		this.validateOffice(officeName);

		try {
			await this.officeRepo.CreateOffice(officeName.office_name);
			revalidatePath("/admin/units/office");
		} catch (error) {
			console.error("Creating Office failed:", error);
			throw new Error("Creating Office failed");
		}
	}

	public async getAllOffice() {
		try {
			return await this.officeRepo.GetAllOffice();
		} catch (error) {
			console.error("Fetching Office failed:", error);
			throw new Error("Fetching Office failed");
		}
	}

	public async getOfficeById(id: number) {
		try {
			return await this.officeRepo.getOfficeById(id);
		} catch (error) {
			console.error("Fetching Office by ID failed:", error);
			throw new Error("Fetching Office by ID failed");
		}
	}

	public async updateOffice(formData: FormData) {
		const updateOffice = {
			office_id: Number(formData.get("office_id")),
			office_name: formData.get("office_name") as string,
		};

		this.validateOffice(updateOffice);

		try {
			await this.officeRepo.UpdateOffice(updateOffice);

			revalidatePath("/admin/units/office");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	public async deleteOffice(id: number) {
		try {
			await this.officeRepo.DeleteOffice(id);

			revalidatePath("/admin/units/office");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateOffice({ office_name }: { office_name: string }) {
		const validate = Validator.validateOffice({ office_name });

		if (!validate.success) {
			throw new Error("Validation failed for inserting office.");
		}
	}
}
