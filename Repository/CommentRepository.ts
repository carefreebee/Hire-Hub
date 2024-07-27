import { eq, inArray } from "drizzle-orm";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { db } from "~/lib/db";
import { CommentsInsert, applicant, comments, users } from "~/lib/schema";
import { StageType } from "~/types/types";

export class CommentRepository {
	public async getAllCommentsById(id: number) {
		return await db.query.comments.findFirst({
			where: eq(comments.id, id),
		});
	}

	public async getCommentsByID(applicantId: number, commentId: number[]) {
		if (!commentId || commentId.length === 0) {
			return [];
		}

		const comment = await db
			.select()
			.from(applicant)
			.leftJoin(comments, inArray(comments.id, commentId))
			.leftJoin(users, eq(users.id, comments.commented_by))
			.where(eq(applicant.id, applicantId))
			.orderBy(comments.id);

		return comment.map((row) => ({
			id: row.applicant.id,
			commentId: row.comments?.id,
			comment: row.comments?.comment,
			commented_by: row.users?.name,
			commented_role: row.users?.role,
		}));
	}

	public async insertAndGetCurrentInsertedComment(comment: CommentsInsert, applicantId: number) {
		const insertingComment = await db.insert(comments).values(comment).returning();
		const currentApplicant = await getApplicantFormByID(applicantId);

		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return { insertingComment, currentApplicant };
	}

	public async updateApplicantScreeningComment(applicantId: number, comment: CommentsInsert) {
		const { insertingComment, currentApplicant } =
			await this.insertAndGetCurrentInsertedComment(comment, applicantId);

		const instertComment = await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
						comment_id: [
							...(currentApplicant.stages?.screening?.comment_id ?? []),
							insertingComment[0].id,
						],
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();

		return instertComment;
	}

	public async updateApplicantComment(
		applicantId: number,
		comment: CommentsInsert,
		stageType: StageType
	) {
		const { insertingComment, currentApplicant } =
			await this.insertAndGetCurrentInsertedComment(comment, applicantId);

		const instertComment = await db
			.update(applicant)
			.set({
				stages: {
					...currentApplicant.stages,
					screening: {
						...currentApplicant.stages?.screening,
					},
					[stageType]: {
						...currentApplicant.stages?.[stageType],
						comment_id: [
							...(currentApplicant.stages?.[stageType]?.comment_id ?? []),
							insertingComment[0].id,
						],
					},
				},
			})
			.where(eq(applicant.id, applicantId))
			.returning();

		return instertComment;
	}
}
