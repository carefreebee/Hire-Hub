import TypographyH4 from "~/components/ui/typography-h4";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllDepartment } from "~/Controller/DepartmentController";

export default async function RequestPage() {
	const department = await getAllDepartment();

	return (
		<section className="p-8">
			<TypographyH4 text="Units" />
			<DataTable columns={columns} data={department} />
		</section>
	);
}
