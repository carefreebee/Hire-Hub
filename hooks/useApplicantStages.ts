import { getApplicantFormByID } from "~/controller/ApplicantController";

export async function getApplicantData(id: number) {
	const applicant = await getApplicantFormByID(Number(id));

	const {
		screening,
		teaching_demo,
		panel_interview,
		initial_interview,
		psychological_exam,
		recommendation_for_hiring,
	} = applicant?.stages || {};

	const stages = [
		{ name: "Screening", status: screening?.status },
		{ name: "Initial Interview", status: initial_interview?.status },
		{ name: "Teaching Demo", status: teaching_demo?.status },
		{ name: "Psychological Exam", status: psychological_exam?.status },
		{ name: "Panel Interview", status: panel_interview?.status },
		{ name: "Recommendation", status: recommendation_for_hiring?.status },
	];

	return { applicant, stages };
}
