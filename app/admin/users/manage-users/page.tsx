import { getUsersByUserRole } from "~/controller/UsersController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ManageUsersPage() {
	const users = await getUsersByUserRole();

	return <DataTable columns={columns} data={users} />;
}
