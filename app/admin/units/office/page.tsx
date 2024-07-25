import TypographyH4 from "~/components/ui/typography-h4";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllOffice } from "~/Controller/OfficeController";

export default async function RequestPage() {
	const office = await getAllOffice();

	return (
		<section className="p-8">
			<TypographyH4 text="Units" />
			<DataTable columns={columns} data={office} />
		</section>
	);
}
