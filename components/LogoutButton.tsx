import { logout } from "~/actions/actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
	return (
		<form action={logout}>
			<Button
				type="submit"
				variant={"ghost"}
				className="text-md h-auto p-0 hover:bg-transparent hover:text-white"
			>
				Logout
			</Button>
		</form>
	);
}
