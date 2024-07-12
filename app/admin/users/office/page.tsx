import TypographyH4 from "~/components/ui/typography-h4";
import { getUsersWithOffice } from "~/controller/UsersController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ManageUsersPage() {
	const users = await getUsersWithOffice();

	return (
		<>
			<TypographyH4 text="Users List" />
			<DataTable columns={columns} data={users} />
		</>
	);
}
