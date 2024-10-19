import { DropdownMenu, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default function SchedulePage() {
	return (
		<div className="m-20">
			<h1 className="text-xl font-bold">Schedule</h1>
			<div>
				<h1>July 14-20</h1>
				<DropdownMenu>
					<DropdownMenuTrigger></DropdownMenuTrigger>
				</DropdownMenu>
			</div>
		</div>
	);
}
