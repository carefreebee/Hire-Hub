import TypographyH4 from "~/components/ui/typography-h4";
import {
	getAllApplicantByDeptOrOffice,
	getAllApplicantForm,
} from "~/Controller/ApplicantFormController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ApplicantPage() {
	const { user } = await validateRequest();

	const higherUps = ["guidance_center_staff", "recruitment_officer", "hr_head"];

	let applicant: ApplicantSelect[] = [];

	if (higherUps.includes(user?.role as string)) {
		console.log("Fetching all applicant forms");
		applicant = await getAllApplicantForm();
	} else {
		console.log("Fetching applicants by department or office");
		applicant = await getAllApplicantByDeptOrOffice(
			user?.department_id as number,
			user?.office_id as number
		);
	}

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Applicant List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={applicant} />
			</div>
		</section>
	);
}
