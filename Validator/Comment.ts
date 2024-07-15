import { z } from "zod";

export class Validator {
	static validateComment(comment: CommentType) {
		const validationResult = commentSchema.safeParse(comment);
		return validationResult;
	}
}

export const commentSchema = z.object({
	comment: z.string().min(5, { message: "Comment must have 5 or more characters" }),
});

export type CommentType = z.infer<typeof commentSchema>;
