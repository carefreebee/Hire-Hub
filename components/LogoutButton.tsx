import { logout } from "~/actions/actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
	return (
		<form action={logout}>
			<Button type="submit">Logout</Button>
		</form>
	);
}
