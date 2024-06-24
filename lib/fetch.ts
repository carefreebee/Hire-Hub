import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "./db";
import * as schema from "./schema";

export const GetAllApplicant = cache(async () => {
	const response = await db.select().from(schema.applicant);
	return response;
});

export const GetApplicantByID = cache(async (id: number) => {
	const response = await db.select().from(schema.applicant).where(eq(schema.applicant.id, id));
	return response;
});
