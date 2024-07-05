import { eq } from "drizzle-orm";
import { getApplicantFormByID } from "~/controller/ApplicantController";
import { db } from "~/lib/db";
import { CommentsInsert, applicant, comments } from "~/lib/schema";
import { StageType } from "~/types/types";

export class CommentRepository {
	static async insertComment(comment: CommentsInsert) {
		return await db.insert(comments).values(comment).returning();
	}

	static async insertAndGetCurrentInsertedComment(comment: CommentsInsert, applicantId: number) {
		const insertingComment = await CommentRepository.insertComment(comment);
		const currentApplicant = await getApplicantFormByID(applicantId);

		if (!currentApplicant) {
			throw new Error("Applicant not found");
		}

		return { insertingComment, currentApplicant };
	}

	static async updateApplicantScreeningComment(applicantId: number, comment: CommentsInsert) {
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

	static async updateApplicantComment(
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
