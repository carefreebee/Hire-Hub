import { getUsersWithoutUserRoles } from "~/controller/UsersController";

// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
export async function DisplayAssessedBy() {
	const users = await getUsersWithoutUserRoles();

	return users.map((user) => ({
		id: user.id,
		name: user.name,
		role: user.role,
	}));
}
