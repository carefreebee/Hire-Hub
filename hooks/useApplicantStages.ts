import { getApplicantFormByID } from "~/controller/ApplicantFormController";
interface Stage {
	name: string;
	status?: "" | "in-progress" | "passed" | "failed" | undefined;
	assessed_by?: string[];
	rating_forms_id?: number[];
}
export async function getApplicantData(id: number) {
	const applicant = await getApplicantFormByID(Number(id));

	 const stages: Stage[] = [
			{
				name: "Teaching Demo",
				status: applicant?.stages?.teaching_demo?.status || "", // Default empty string if undefined
				assessed_by: applicant?.stages?.teaching_demo?.assessed_by || [], // Default empty array if undefined
				rating_forms_id: applicant?.stages?.teaching_demo?.rating_forms_id || [], // Default empty array if undefined
			},
			{
				name: "Psychological Exam",
				status: applicant?.stages?.psychological_exam?.status || "",
				assessed_by: applicant?.stages?.psychological_exam?.assessed_by || [],
				rating_forms_id: applicant?.stages?.psychological_exam?.rating_forms_id || [],
			},
			{
				name: "Panel Interview",
				status: applicant?.stages?.panel_interview?.status || "",
				assessed_by: applicant?.stages?.panel_interview?.assessed_by || [],
				rating_forms_id: applicant?.stages?.panel_interview?.rating_forms_id || [],
			},
			{
				name: "Recommendation",
				status: applicant?.stages?.recommendation_for_hiring?.status || "",
				assessed_by: applicant?.stages?.recommendation_for_hiring?.assessed_by || [],
				rating_forms_id:
					applicant?.stages?.recommendation_for_hiring?.rating_forms_id || [],
			},
		];
	return { applicant, stages };
}
