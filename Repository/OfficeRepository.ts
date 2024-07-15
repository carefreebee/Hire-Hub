import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { office, OfficeInsert } from "~/lib/schema";

export class OfficeRepository {
	public async CreateOffice(officeName: string) {
		try {
			return await db.insert(office).values({ office_name: officeName }).returning();
		} catch (error) {
			console.error("Creating Office failed:", error);
			throw new Error("Creating Office failed");
		}
	}

	async GetAllOffice() {
		try {
			return await db.query.office.findMany();
		} catch (error) {
			console.error("Fetching Office failed:", error);
			throw new Error("Fetching Office failed");
		}
	}

	async getOfficeById(id: number) {
		try {
			return await db.query.office.findFirst({ where: eq(office.office_id, id) });
		} catch (error) {
			console.error("Fetching Office by ID failed:", error);
			throw new Error("Fetching Office by ID failed");
		}
	}

	public async GetOfficeIdByName(selected_office: string) {
		try {
			const officeRecord = await db.query.office.findFirst({
				where: eq(office.office_name, selected_office),
			});

			return officeRecord?.office_id ?? null;
		} catch (error) {
			console.error("Fetching Office ID by Name failed:", error);
			throw new Error("Fetching Office ID by Name failed");
		}
	}

	public async UpdateOffice({ office_id, office_name }: OfficeInsert) {
		try {
			return await db
				.update(office)
				.set({ office_name: office_name })
				.where(eq(office.office_id, office_id as number));
		} catch (error) {
			console.error("Updating Office failed:", error);
			throw new Error("Updating Office failed");
		}
	}

	public async DeleteOffice(id: number) {
		return await db.delete(office).where(eq(office.office_id, id));
	}
}
