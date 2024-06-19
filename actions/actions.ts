"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { lucia, validateRequest } from "~/lib/auth";
import { applicantSchema } from "~/lib/zod";

// 2. Define a submit handler.
export function onSubmit(values: z.infer<typeof applicantSchema>) {
	// Do something with the form values.
	// ✅ This will be type-safe and validated.
	console.log({ values });
}

interface ActionResult {
	error: string | null;
}

export async function Logout(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}
