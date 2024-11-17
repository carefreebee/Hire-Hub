import { getApplicantFormByID } from "~/controller/ApplicantFormController";

export async function getApplicantData(id: number) {
	const applicant = await getApplicantFormByID(Number(id));

	const stages = [
		// { name: "Screening", status: applicant?.stages?.screening?.status },
		// {
		// 	name: "Initial Interview",
		// 	status: applicant?.stages?.initial_interview?.status,
		// 	assessed_by: applicant?.stages?.initial_interview?.assessed_by,
		// 	rating_forms_id: applicant?.stages?.initial_interview?.rating_forms_id,
		// },
		{
			name: "Teaching Demo",
			status: applicant?.stages?.teaching_demo?.status,
			assessed_by: applicant?.stages?.teaching_demo?.assessed_by,
			rating_forms_id: applicant?.stages?.teaching_demo?.rating_forms_id,
		},
		{
			name: "Psychological Exam",
			status: applicant?.stages?.psychological_exam?.status,
			assessed_by: applicant?.stages?.psychological_exam?.assessed_by,
			rating_forms_id: applicant?.stages?.psychological_exam?.rating_forms_id,
		},
		{
			name: "Panel Interview",
			status: applicant?.stages?.panel_interview?.status,
			assessed_by: applicant?.stages?.panel_interview?.assessed_by,
			rating_forms_id: applicant?.stages?.panel_interview?.rating_forms_id,
		},
		{
			name: "Recommendation",
			status: applicant?.stages?.recommendation_for_hiring?.status,
			assessed_by: applicant?.stages?.recommendation_for_hiring?.assessed_by,
			rating_forms_id: applicant?.stages?.recommendation_for_hiring?.rating_forms_id,
		},
	];

	return { applicant, stages };
}
