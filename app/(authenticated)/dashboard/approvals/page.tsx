import TypographyH4 from "~/components/ui/typography-h4";
import { getAllJobRequest, getJobReqByDeptOrOffice } from "~/controller/JobRequestController";
import { validateRequest } from "~/lib/auth";
import { JobRequestSelect, RoleEnumsType } from "~/lib/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Approvals() {
	const { user } = await validateRequest();

	const higherUps: RoleEnumsType[] = [
		"guidance_center_staff",
		"recruitment_officer",
		"hr_head",
		"vp_acad_affairs",
		"vp_administration",
		"univ_president",
	];

	let applicant: JobRequestSelect[] = [];

	if (higherUps.includes(user?.role as RoleEnumsType)) {
		applicant = await getAllJobRequest();
	} else {
		applicant = await getJobReqByDeptOrOffice(
			user?.department_id as number,
			user?.office_id as number
		);
	}
	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Job Request List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={applicant} />
			</div>
		</section>
	);
}
