import TypographyH4 from "~/components/ui/typography-h4";
import { getAllJobRequest } from "~/controller/JobRequestController";
import { getAllUsers } from "~/controller/UsersController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersPage() {
	const jobRequest = await getAllJobRequest();
	const users = await getAllUsers();

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Users List" />
			<div className="mx-auto">
				<DataTable columns={columns} data={jobRequest} />
			</div>
		</section>
	);
}
