import { getApplicantFormByID } from "~/controller/ApplicantController";

export async function getApplicantData(id: number) {
	const applicant = await getApplicantFormByID(Number(id));

	const stages = [
		// { name: "Screening", status: applicant?.stages?.screening?.status },
		{
			name: "Initial Interview",
			status: applicant?.stages?.initial_interview?.status,
			assessed_by: applicant?.stages?.initial_interview?.assessed_by,
		},
		{
			name: "Teaching Demo",
			status: applicant?.stages?.teaching_demo?.status,
			assessed_by: applicant?.stages?.teaching_demo?.assessed_by,
		},
		{
			name: "Psychological Exam",
			status: applicant?.stages?.psychological_exam?.status,
			assessed_by: applicant?.stages?.psychological_exam?.assessed_by,
		},
		{
			name: "Panel Interview",
			status: applicant?.stages?.panel_interview?.status,
			assessed_by: applicant?.stages?.panel_interview?.assessed_by,
		},
		{
			name: "Recommendation",
			status: applicant?.stages?.recommendation_for_hiring?.status,
			assessed_by: applicant?.stages?.recommendation_for_hiring?.assessed_by,
		},
	];

	return { applicant, stages };
}
