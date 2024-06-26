import { Users, usersSchema } from "~/lib/zod";

export class Validator {
	static validateUsersData(usersData: Users) {
		const validationResult = usersSchema.safeParse(usersData);
		console.log(validationResult);
		return validationResult;
	}
}
