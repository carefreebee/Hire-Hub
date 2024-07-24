"use server";

import { applicantFormService } from "~/Dependencies/dependencies";

export async function getAllApplicantForm() {
	return await applicantFormService.getAllApplicantForm();
}

export async function getAllApplicantByDeptOrOffice(
	department_id: number | null,
	office_id: number | null
) {
	return await applicantFormService.getAllApplicantByDeptOrOffice(department_id, office_id);
}


export async function getApplicantFormByID(id: number) {
	return await applicantFormService.getApplicantFormByID(id);
}

export async function CreateApplicantForm(formData: FormData) {
	return await applicantFormService.create(formData);
}