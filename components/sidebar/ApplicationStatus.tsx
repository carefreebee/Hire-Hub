import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function ApplicationStatus() {
	return (
		<>
			<ul className="flex flex-col gap-8">
				<div>
					<li>Initial Interview</li>
					<DropdownMeneComponent />
				</div>
				<div>
					<li>Teaching Demo</li>
					<DropdownMeneComponent />
				</div>
				<div>
					<li>Psychological Exam</li>
					<DropdownMeneComponent />
				</div>
				<div>
					<li>Panel Interview</li>
					<DropdownMeneComponent />
				</div>
				<div>
					<li>Recommendation for Hiring</li>
					<DropdownMeneComponent />
				</div>
			</ul>
		</>
	);
}

function DropdownMeneComponent() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 bg-gray-200 p-0 px-2 hover:bg-gray-300">
					<span className="mr-2">In Progress</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="rounded-xl">
				<DropdownMenuItem>Passed</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-[#EC3838]">Failed</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
