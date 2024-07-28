import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { office, OfficeInsert } from "~/lib/schema";

export class OfficeRepository {
	public async CreateOffice(officeCode: string, officeName: string) {
		return await db
			.insert(office)
			.values({ office_code: officeCode, office_name: officeName })
			.returning();
	}

	async GetAllOffice() {
		return await db.query.office.findMany();
	}

	async getOfficeById(id: number) {
		return await db.query.office.findFirst({ where: eq(office.office_id, id) });
	}

	async getOfficeByCode(code: string) {
		return await db.query.office.findFirst({ where: eq(office.office_code, code) });
	}

	public async GetOfficeIdByName(selected_office: string) {
		const officeRecord = await db.query.office.findFirst({
			where: eq(office.office_name, selected_office),
		});

		return officeRecord?.office_id ?? null;
	}

	public async UpdateOffice({ office_id, office_name }: OfficeInsert) {
		return await db
			.update(office)
			.set({ office_name: office_name })
			.where(eq(office.office_id, office_id as number));
	}

	public async DeleteOfficeByCode(code: string) {
		return await db.delete(office).where(eq(office.office_code, code));
	}
}
