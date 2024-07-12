import { getApplicantFormByID } from "~/controller/ApplicantController";
import { StageType } from "~/types/types";

// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
export async function GetCurrentStage(id: number, stage: StageType) {
	const applicant = await getApplicantFormByID(id);

	const applicantStage = applicant?.stages && applicant?.stages[stage];

	return { applicant, applicantStage };
}

// export async function getStage(applicantId: string, stage: StageType) {
// 	const applicant = await getApplicantFormByID(Number(applicantId));
// 	if (!applicant) {
// 		return;
// 	}
// 	const stages = applicant.stages && applicant.stages[stage];
// 	return stages;
// }
