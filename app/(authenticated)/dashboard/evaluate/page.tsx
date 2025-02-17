import TypographyH4 from "~/components/ui/typography-h4";
import {
	getAllApplicantByDeptOrOffice,
	getAllApplicantForm,
} from "~/controller/ApplicantFormController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect, RoleEnumsType } from "~/lib/schema";

import { DataTable } from "./data-table";

export default async function RequestPage() {
	const { user } = await validateRequest();

	const higherUps: RoleEnumsType[] = [
		"guidance_center_staff",
		"recruitment_officer",
		"hr_head",
		"vp_acad_affairs",
		"vp_administration",
		"univ_president",
	];

	let applicant: ApplicantSelect[] = [];

	if (higherUps.includes(user?.role as RoleEnumsType)) {
		applicant = await getAllApplicantForm();
	} else {
		applicant = await getAllApplicantByDeptOrOffice(
			user?.department_id as number,
			user?.office_id as number
		);
	}

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Evaluate Applicant" />
			<div className="container mx-auto px-10">
				{/* <DataTable columns={columns} data={applicant} /> */}
				<DataTable data={applicant} />
			</div>
		</section>
	);
}
