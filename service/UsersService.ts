import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import * as schema from "~/lib/schema";

export class UsersService {
	async getAllUsers() {
		return await db.query.users.findMany();
	}

	async getAllUsersByID(id: number) {
		return await db.query.users.findFirst({
			where: eq(schema.users.id, id.toString()),
		});
	}
}
