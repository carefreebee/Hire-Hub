import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersDirectoryPage() {
	const users = await getUsersWithoutUserRoles();

	return <DataTable columns={columns} data={users} />;
}
