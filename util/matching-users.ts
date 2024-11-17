import { getUsersByUserID } from "~/controller/UsersController";
import { User } from "~/lib/schema";

// GETTING THE USERS WHO WILL ASSESS THE APPLICANT
export async function MatchingUser(assessedByUserIds: string[]): Promise<Partial<User>[]> {
	const userDetailsArray: Partial<User[]> = [];
	await Promise.all(
		assessedByUserIds.map(async (userId) => {
			const userDetails = await getUsersByUserID(userId);
			if (Array.isArray(userDetails)) {
				userDetailsArray.push(...userDetails);
			} else {
				userDetailsArray.push(userDetails);
			}
		})
	);
	return userDetailsArray.map((user) => ({
		id: user?.id,
		name: user?.name,
		role: user?.role,
	}));
}
