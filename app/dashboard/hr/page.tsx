import { TypographySmall } from "~/components/ui/typography-small";
import { DATE, DEPARTMENT, STATUS } from "~/constants/constants";

export default function HrPage() {
	return (
		<>
			{/* MAIN CONTENT BASED ON THE SUB NAVIGATION */}
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
							<TypographySmall size={"md"}>{STATUS}</TypographySmall>
							<TypographySmall
								variant={"secondary"}
								size={"sm"}
								className="ml-28 text-xs"
							>
								PASSED
							</TypographySmall>
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
