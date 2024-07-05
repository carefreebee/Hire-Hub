"use server";

import { DeptOrOfficeUpdatesApplicantStatusService } from "~/service/DeptOrOfficeUpdatesApplicantStatusService";

// export async function handleHrHeadUpdatesApplicantStatusInitialInterview(formData: FormData) {
// 	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
// 	return await applicantFormService.updateApplicantStatusInitialInterview(formData);
// }

// export async function handleHrHeadUpdatesApplicantStatusTeachingDemo(formData: FormData) {
// 	const applicantFormService = new HrHeadUpdatesApplicantStatusService();
// 	return await applicantFormService.updateApplicantStatusTeachingDemo(formData);
// }

export async function hanldeDeptOrOfficeUpdatesApplicantInitialInterview(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updateApplicantStatusInitialInterview(formData);
}

export async function handleDeptOrOfficeUpdatesApplicantStatusTeachingDemo(formData: FormData) {
	const updatesApplicantStatusService = new DeptOrOfficeUpdatesApplicantStatusService();
	return await updatesApplicantStatusService.updateApplicantStatusTeachingDemo(formData);
}