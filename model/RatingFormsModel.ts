interface UpdateEvaluateApplicantStatusModel {
	applicantId: number;
	recruitment_stage: string;
	status: "passed" | "failed";
}
