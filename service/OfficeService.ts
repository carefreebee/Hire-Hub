import { revalidatePath } from "next/cache";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { Office, Validator } from "~/validator/Office";

export class OfficeService {
	constructor(private readonly officeRepo: OfficeRepository) {}

	public async createOffice(formData: FormData) {
		const office = {
			office_code: formData.get("office_code") as string,
			office_name: formData.get("office_name") as string,
		};
		this.validateOffice(office);

		try {
			await this.officeRepo.CreateOffice(office.office_code, office.office_name);
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

	public async getOfficeByCode(code: string) {
		try {
			return await this.officeRepo.getOfficeByCode(code);
		} catch (error) {
			console.error("Fetching Office by CODE failed:", error);
			throw new Error("Fetching Office by CODE failed");
		}
	}

	public async updateOffice(formData: FormData) {
		const updateOffice = {
			office_id: Number(formData.get("office_id")),
			office_code: formData.get("office_code") as string,
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

	public async deleteOfficeByCode(code: string) {
		try {
			await this.officeRepo.DeleteOfficeByCode(code);

			revalidatePath("/admin/units/office");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateOffice(office: Office) {
		const validate = Validator.validateOffice(office);

		if (!validate.success) {
			throw new Error("Validation failed for inserting office.");
		}
	}
}
