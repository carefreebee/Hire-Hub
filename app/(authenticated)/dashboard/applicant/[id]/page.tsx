import { TypographySmall } from "~/components/ui/typography-small";
import { DATE, DEPARTMENT, STATUS } from "~/constants/constants";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export default function ApplicantIdPage({ params }: { params: { id: string } }) {
	return (
		<>
			<section className="my-14 h-[197px] border-2">
				<header className="flex items-center border-b-2">
					<div className="flex-1">
						<TypographySmall className="px-5">{STATUS}</TypographySmall>
					</div>
					<div className="mr-10 flex-1">
						Assigned:{" "}
						<TypographySmall variant={"outline"} className="h-8 px-3">
							{DEPARTMENT}
						</TypographySmall>
					</div>
				</header>
				<div className="flex items-center">
					<div className="mb-16 mt-4 flex flex-1 flex-col">
						<div>
							<TypographySmall size={"md"} className="mr-20">{STATUS}</TypographySmall>
							<DropdownMeneComponent />
						</div>
						<TypographySmall size={"md"} className="pt-0 text-xs">
							{DATE}
						</TypographySmall>
					</div>
					<div className="mb-16 mr-10 mt-4 flex flex-1 flex-col">
						<TypographySmall size={"md"} className="px-0">
							Assessed by:
						</TypographySmall>
						<TypographySmall size={"md"} className="px-0 text-xs">
							Random Name | Human Resource Staff
						</TypographySmall>
					</div>
				</div>
			</section>
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
