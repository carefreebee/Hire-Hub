import dynamic from "next/dynamic";
import { validateRequest } from "~/lib/auth";
import { Button } from "./ui/button";
import { Logout } from "~/actions/actions";

export default async function LogoutButton() {
	const { user } = await validateRequest();

	return (
		<>
			{user && (
				<form action={Logout}>
					<Button type="submit">Logout</Button>
				</form>
			)}
		</>
	);
}
