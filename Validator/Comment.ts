import { Comment, commentSchema } from "~/lib/zod";

export class Validator {
	static validateComment(comment: Comment) {
		const validationResult = commentSchema.safeParse(comment);
		console.log(validationResult);
		return validationResult;
	}
}
