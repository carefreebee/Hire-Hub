import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TypographySmall } from "~/components/ui/typography-small";
import { getApplicantFormByID } from "~/controller/ApplicantController";

export default async function ApplicantIdPage({ params }: { params: { id: string } }) {
	// const { applicant, stages } = await getApplicantData(Number(params.id));
	const applicant = await getApplicantFormByID(Number(params.id));

	const {
		screening,
		teaching_demo,
		panel_interview,
		initial_interview,
		psychological_exam,
		recommendation_for_hiring,
	} = applicant?.stages || {};

	const stages = [
		{ name: "Screening", status: screening?.status },
		{ name: "Initial Interview", status: initial_interview?.status },
		{ name: "Teaching Demo", status: teaching_demo?.status },
		{ name: "Psychological Exam", status: psychological_exam?.status },
		{ name: "Panel Interview", status: panel_interview?.status },
		{ name: "Recommendation", status: recommendation_for_hiring?.status },
	];

	return (
		<>
			<section className="my-14 h-[197px] border-2">
				<header className="flex items-center border-b-2">
					<div className="flex-1">
						<TypographySmall className="px-5">{applicant?.status}</TypographySmall>
					</div>
				</header>
				<div className="flex items-center">
					<div className="mb-16 mt-4 flex flex-1 flex-col">
						<div>
							<TypographySmall size={"md"} className="mr-20">
								{applicant?.status}
							</TypographySmall>
							<DropdownMeneComponent />
						</div>
						<TypographySmall size={"md"} className="pt-0 text-xs">
							{""}
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
