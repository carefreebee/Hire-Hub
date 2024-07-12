import { getApplicantCommentByID } from "~/controller/ApplicantController";

export async function GetCommentsById(commentIds: number[]) {
	const getCommentById = commentIds?.map((commentId) => getApplicantCommentByID(commentId));
	return await Promise.all(getCommentById || []);
}
