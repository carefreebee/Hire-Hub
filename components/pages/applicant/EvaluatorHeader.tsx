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

	const isRole = () =>
		user?.role === "dean" ||
		user?.role === "department_chair" ||
		user?.role === "recruitment_officer";

	return (
		<header className="w-80%">
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="text-center text-xl font-semibold">
							Applicant Evaluation
						</TypographySmall>
					</div>
				</div>
			</section>

			<div>
				<ul className="grid grid-cols-3 rounded-lg border shadow-md">
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/initial-interview`}
							className={`rounded-lg px-2 py-2 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white`}
						>
							Initial Interview
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/teaching-demo`}
							className={`rounded-lg px-2 py-2 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white`}
						>
							Teaching Demo
						</Link>
					)}
					{isRole() && (
						<Link
							href={`/dashboard/evaluate/${id}/${user?.role}/panel-interview`}
							className={`rounded-lg px-2 py-2 text-center text-sm font-medium text-black hover:bg-[#333333] hover:text-white`}
						>
							Panel Interview
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
