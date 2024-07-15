// export async function getUserRole() {
// 	const users = await getUsersWithoutUserRoles();

// 	return users.map((user) => ({
// 		id: user.id,
// 		name: user.name,
// 		role: user.role,
// 	}));
// }

// export const GetAllApplicant = cache(async () => {
// 	const response = await db.select().from(schema.applicant);
// 	return response;
// });

// export const GetApplicantByID = cache(async (id: number) => {
// 	const response = await db.select().from(schema.applicant).where(eq(schema.applicant.id, id));
// 	return response;
// });

// export function GetCommentsForEachStage(
// 	applicant: schema.ApplicantSelect,
// 	stage: StageType
// ): StageStatus | null {
// 	return applicant.stages && (applicant.stages[stage] as StageStatus | null);
// }

// export async function GetCurrentStage(applicantId: string, stage: StageType) {
// 	const applicant = await getApplicantFormByID(Number(applicantId));
// 	if (!applicant) {
// 		return;
// 	}
// 	const stages = applicant.stages && applicant.stages[stage];
// 	return stages;
// }

// export async function GetStageAssessedBy(stageAssessedBy: number[]) {
// 	const getStageAssessedBy = stageAssessedBy?.map((assessedById) =>
// 		getAllRatingFormsFilesById(assessedById)
// 	);
// 	return await Promise.all(getStageAssessedBy || []);
// }

// export async function GetUsersById(ratingForm: string[]) {
// 	// const user = user_id.map((user) => getUsersByUserID(user));
// 	// return await Promise.all(user || []);
// 	// const user = await getUsersByUserID(user_id);

// 	// return user.map((user) => ({
// 	// 	name: user?.name,
// 	// 	role: user?.role,
// 	// }));
// }

// export async function GetEvaluatorsById(id: string) {
// 	const evaluatorId = await getUsersByUserID(id);

// 	return evaluatorId.map((user) => ({
// 		name: user.name,
// 		role: user.role,
// 	}));
// }
