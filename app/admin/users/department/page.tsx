import TypographyH4 from "~/components/ui/typography-h4";
import { getAllJobRequest } from "~/controller/JobRequestController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersOfficePage() {
	const jobRequest = await getAllJobRequest();

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Users Department List" />
			<div className="mx-auto">
				<DataTable columns={columns} data={jobRequest} />
			</div>
		</section>
	);
}
