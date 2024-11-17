import TypographyH4 from "~/components/ui/typography-h4";
import { getJobReqByDeptOrOffice } from "~/controller/JobRequestController";
import { validateRequest } from "~/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function RequestPage() {
	const { user } = await validateRequest();

	const jobRequest = await getJobReqByDeptOrOffice(
		user?.department_id as number,
		user?.office_id as number
	);

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Job Request List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={jobRequest} />
			</div>
		</section>
	);
}
