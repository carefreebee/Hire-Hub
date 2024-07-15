import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { StageType } from "~/types/types";

// GETTING THE APPLICANT BY ID
// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
export async function GetCurrentStage(id: number, stage: StageType) {
	const applicant = await getApplicantFormByID(id);

	const applicantStage = applicant?.stages && applicant?.stages[stage];

	return { applicant, applicantStage };
}
