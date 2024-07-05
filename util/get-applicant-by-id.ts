import { getApplicantFormByID } from "~/controller/ApplicantController";
import { StageType } from "~/types/types";

export async function GetApplicantById(id: number, stage: StageType) {
	const applicant = await getApplicantFormByID(id);

	const applicantStage = applicant?.stages && applicant?.stages[stage];

	return { applicant, applicantStage };
}
