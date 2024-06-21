import TypographyH4 from "~/components/ui/typography-h4";
import { getApplicantData } from "~/lib/data-applicant";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ApplicantPage() {
	const data = await getApplicantData();

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Applicant List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={data} />
			</div>
		</section>
	);
}
