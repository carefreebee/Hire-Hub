import { getUsersWithoutUserRoles } from "~/controller/UsersController";
import { validateRequest } from "~/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersDirectoryPage() {
	const { user } = await validateRequest();
	const users = await getUsersWithoutUserRoles();

	return <DataTable columns={columns} data={users} />;
}
