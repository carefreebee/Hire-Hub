import TypographyH4 from "~/components/ui/typography-h4";
import { getUsersWithDepartment } from "~/controller/UsersController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ManageUsersPage() {
	const users = await getUsersWithDepartment();

	console.log(users);
	return (
		<>
			<TypographyH4 text="Users List" />
			<DataTable columns={columns} data={users} />
		</>
	);
}
