import Link from "next/link";
import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { StageType } from "~/types/types";
import { TypographySmall } from "../../ui/typography-small";
import { Button } from "~/components/ui/button";

const STAGES = [
	{ link: "initial-interview", type: "initial_interview", name: "Initial Interview" },
	{ link: "teaching-demo", type: "teaching_demo", name: "Teaching Demo" },
	{ link: "psychological-exam", type: "psychological_exam", name: "Psychological Exam" },
	{ link: "panel-interview", type: "panel_interview", name: "Panel Interview" },
	{
		link: "recommendation-for-hiring",
		type: "recommendation_for_hiring",
		name: "Recommendation",
	},
];

export default async function EvaluatorHeader({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant } = await getApplicantData(Number(id));

	const isTeachingStaff = applicant?.positionType === SelectedCategoryTeachingStaff;

	const isRole = () =>
		user?.role === "dean" ||
		user?.role === "department_chair" ||
		user?.role === "recruitment_officer" ||
		user?.role === "faculty" ||
		user?.role === "guidance_center_staff" ||
		user?.role === "hr_head" ||
		user?.role === "univ_president";

	return (
		<header className="w-full">
			<section className="my-5">
				<div className="mb-4 text-center">
					<TypographySmall className="text-xl font-semibold">
						Applicant Evaluation
					</TypographySmall>
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<TypographySmall className="font-semibold">Department:</TypographySmall>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.selected_department || applicant?.selected_office}
						</TypographySmall>
					</div>

					<div className="flex items-center gap-2">
						<TypographySmall className="font-semibold">Applied as:</TypographySmall>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant!.positionType === SelectedCategoryTeachingStaff
								? TeachingStaff
								: NonTeachingStaff}
						</TypographySmall>
					</div>
					<div className="flex items-center gap-2">
						<Button>
							<Link
								href={`/dashboard/evaluate/${id}/${user?.role}/evaluate`}
								className="px-2 py-2 text-sm font-medium"
							>
								Evaluate
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<div>
				<ul
					className={`grid ${
						isTeachingStaff ? "grid-cols-6" : "grid-cols-5"
					} rounded-sm border shadow-md`}
				>
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/screening`}
							className={`rounded-md px-2 py-5 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.screening?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Screening</p>
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/initial-interview`}
							className={`rounded-md px-2 py-5 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.initial_interview?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Initial Interview</p>
						</Link>
					)}
					{isRole() && isTeachingStaff && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/teaching-demo`}
							className={`rounded-md px-2 py-5 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.teaching_demo?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Teaching Demo</p>
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/psychological-exam`}
							className={`rounded-md px-2 py-3 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.psychological_exam?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Psychological Exam</p>
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/panel-interview`}
							className={`rounded-md px-2 py-5 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.panel_interview?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Panel Interview</p>
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/recommendation-for-hiring`}
							className={`rounded-md px-2 py-5 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white ${
								applicant?.stages?.recommendation_for_hiring?.status === "passed"
									? "bg-green-500 text-white"
									: ""
							}`}
						>
							<p className="text-[12.5px]">Recommendation</p>
						</Link>
					)}
				</ul>
			</div>
		</header>
	);
}

type StagesProps = {
	id: number;
	role: string;
	stageLink: string;
	stageType: StageType;
	applicant: ApplicantSelect;
	name: string;
};

function Stages({ id, role, stageLink, stageType, applicant, name }: StagesProps) {
	return (
		<Link
			href={`/dashboard/applicant/${id}/stages/${role}/${stageLink}`}
			className={`flex px-2 py-2 text-sm font-medium text-black hover:bg-[#333333] hover:text-white`}
		>
			{name}
		</Link>
	);
}
