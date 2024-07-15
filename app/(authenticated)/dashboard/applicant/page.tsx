import TypographyH4 from "~/components/ui/typography-h4";
import { getAllApplicantForm } from "~/Controller/ApplicantFormController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ApplicantPage() {
	// const { user } = await validateRequest();
	const applicant = await getAllApplicantForm();

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Applicant List" />
			<div className="container mx-auto px-10">
				<DataTable columns={columns} data={applicant} />
			</div>
		</section>
	);
}
