import TypographyH4 from "~/components/ui/typography-h4";
import { getAllJobRequest } from "~/controller/JobRequestController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function RequestPage() {
	const jobRequest = await getAllJobRequest();

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Job Request List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={jobRequest} />
			</div>
		</section>
	);
}
