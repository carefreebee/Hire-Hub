import { getData } from "~/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ApplicantPage() {
	const data = await getData();

	return (
		<section className="px-10 py-10 bg-slate-200/30">
			<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Applicant List</h4>
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={data} />
			</div>
		</section>
	);
}
