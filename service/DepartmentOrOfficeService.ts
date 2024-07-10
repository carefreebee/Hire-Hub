import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/lib/db";
import { department, office } from "~/lib/schema";
import { Validator } from "~/Validator/DepartmentOrOffice";

export class DepartmentOrOfficeService {
	async createDepartment(formData: FormData) {
		const departmentName = {
			department_name: formData.get("department_name") as string,
		};
		this.validateDepartment(departmentName);

		try {
			await db.insert(department).values({ department_name: departmentName.department_name });
			revalidatePath("/admin/units/department");
		} catch (error) {
			console.error("Creating Applicant Status failed:", error);
			throw new Error("Creating Applicant Status failed");
		}
	}

	async getAllDepartment() {
		try {
			return await db.query.department.findMany();
		} catch (error) {
			console.error("Get Department failed:", error);
			throw new Error("Get Department failed");
		}
	}

	async getDepartmentById(id: number) {
		try {
			return await db.query.department.findFirst({ where: eq(department.department_id, id) });
		} catch (error) {
			console.error("Get Department failed:", error);
			throw new Error("Get Department failed");
		}
	}

	async updateDepartment(formData: FormData) {
		const updateDepartment = {
			department_id: Number(formData.get("department_id")),
			department_name: formData.get("department_name") as string,
		};

		this.validateDepartment(updateDepartment);

		try {
			await db
				.update(department)
				.set({ department_name: updateDepartment.department_name })
				.where(eq(department.department_id, updateDepartment.department_id));

			revalidatePath("/admin/units/department");
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	async createOffice(formData: FormData) {
		const officeName = {
			office_name: formData.get("office_name") as string,
		};
		this.validateOffice(officeName);

		try {
			await db.insert(office).values({ office_name: officeName.office_name });
			revalidatePath("/admin/units/office");
		} catch (error) {
			console.error("Creating Applicant Status failed:", error);
			throw new Error("Creating Applicant Status failed");
		}
	}

	async getAllOffice() {
		try {
			return await db.select().from(office);
		} catch (error) {
			console.error("Get Office failed:", error);
			throw new Error("Get Office failed");
		}
	}

	async getOfficeById(id: number) {
		try {
			return await db.query.office.findFirst({ where: eq(office.office_id, id) });
		} catch (error) {
			console.error("Get Office failed:", error);
			throw new Error("Get Office failed");
		}
	}

	async updateOffice(formData: FormData) {
		const updateOffice = {
			office_id: Number(formData.get("office_id")),
			office_name: formData.get("office_name") as string,
		};

		this.validateOffice(updateOffice);

		try {
			await db
				.update(office)
				.set({ office_name: updateOffice.office_name })
				.where(eq(office.office_id, updateOffice.office_id));

			revalidatePath("/admin/units/office");
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

	private validateOffice({ office_name }: { office_name: string }) {
		const validate = Validator.validateOffice({ office_name });

		if (!validate.success) {
			throw new Error("Validation failed for inserting office.");
		}
	}
}
