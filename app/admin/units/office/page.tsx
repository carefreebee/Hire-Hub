import TypographyH4 from "~/components/ui/typography-h4";
import { getAllOffice } from "~/controller/DepartmentOrOfficeController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function RequestPage() {
	const office = await getAllOffice();

	return (
		<>
			<TypographyH4 text="Units" />
			<DataTable columns={columns} data={office} />
		</>
	);
}
