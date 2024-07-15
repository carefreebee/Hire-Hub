import { revalidatePath } from "next/cache";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { Validator } from "~/Validator/Department";

export class DepartmentService {
	constructor(private readonly departmentRepo: DepartmentRepository) {}

	public async createDepartment(formData: FormData) {
		const departmentName = {
			department_name: formData.get("department_name") as string,
		};
		this.validateDepartment(departmentName);

		try {
			await this.departmentRepo.CreateDepartment(departmentName.department_name);
			revalidatePath("/admin/units/department");
		} catch (error) {
			console.error("Creating Department failed:", error);
			throw new Error("Creating Department failed");
		}
	}

	public async getAllDepartment() {
		try {
			return await this.departmentRepo.GetAllDepartment();
		} catch (error) {
			console.error("Fetching Department failed:", error);
			throw new Error("Fetching Department failed");
		}
	}

	public async getDepartmentById(id: number) {
		try {
			return await this.departmentRepo.getDepartmentById(id);
		} catch (error) {
			console.error("Fetching Department by ID failed:", error);
			throw new Error("Fetching Department by ID failed");
		}
	}

	public async updateDepartment(formData: FormData) {
		const updateDepartment = {
			department_id: Number(formData.get("department_id")),
			department_name: formData.get("department_name") as string,
		};

		this.validateDepartment(updateDepartment);

		try {
			await this.departmentRepo.UpdateDepartment(updateDepartment);

			revalidatePath("/admin/units/department");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	public async deleteDepartment(id: number) {
		try {
			await this.departmentRepo.DeleteDepartment(id);

			revalidatePath("/admin/units/department");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateDepartment({ department_name }: { department_name: string }) {
		const validate = Validator.validateDepartment({ department_name });

		if (!validate.success) {
			throw new Error("Validation failed for inserting department.");
		}
	}
}
