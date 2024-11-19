"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia, validateRequest } from "~/lib/auth";
import { User } from "~/lib/schema";

interface ActionResult {
	error: string | null;
}

export async function logout(): Promise<ActionResult> {
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

export async function getCurrentUser(): Promise<User | null> {
	const { user, session } = await validateRequest();
	if (!session) {
		return null;
	}
	return user;
}
