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
import { filterStagesByOffice } from "~/util/filter-applicant-status";
import { TypographySmall } from "../../ui/typography-small";

const STAGES = [
	{ link: "initial-interview", type: "initial_interview", name: "Initial Interview" },
	{ link: "teaching-demo", type: "teaching_demo", name: "Teaching Demo" },
	{ link: "psychological-exam", type: "psychological_exam", name: "Psychological Exam" },
	{ link: "panel-interview", type: "panel_interview", name: "Panel Interview" },
	{
		link: "recommendation-for-hiring",
		type: "recommendation_for_hiring",
		name: "Recommendation for Hiring",
	},
];

export default async function AssessorHeader({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant } = await getApplicantData(Number(id));

	const screeningStatus = getStageStatus(applicant as ApplicantSelect, "screening");

	let filteredStages = STAGES;
	if (applicant?.office_id !== null && applicant?.selected_office !== null) {
		filteredStages = STAGES.filter((stage) => stage.name !== "Teaching Demo");
	}

	return (
		<header>
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-semibold">Department</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.selected_department || applicant?.selected_office}
						</TypographySmall>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-medium">Applied as:</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.positionType === SelectedCategoryTeachingStaff
								? TeachingStaff
								: NonTeachingStaff}
						</TypographySmall>
					</div>
				</div>
			</section>

			<div>
				<ul className="flex justify-between rounded-lg border shadow-md">
					<Link
						href={`/dashboard/applicant/${id}/stages/${user?.role}/evaluate`}
						className="px-3 py-2 text-sm font-medium"
					>
						Evaluate
					</Link>
					{user?.role === "recruitment_officer" && (
						<Link
							href={`/dashboard/applicant/${id}/stages/recruitment_officer/screening`}
							className={`${screeningStatus} px-3 py-2 text-sm font-medium`}
						>
							Screening
						</Link>
					)}
					{filteredStages.map((stage) => (
						<Stages
							key={stage.link}
							id={Number(id)}
							role={user?.role as string}
							stageLink={stage.link}
							stageType={stage.type as StageType}
							applicant={applicant as ApplicantSelect}
							name={stage.name}
						/>
					))}
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
	const statusClass = getStageStatus(applicant, stageType);
	return (
		<Link
			href={`/dashboard/applicant/${id}/stages/${role}/${stageLink}`}
			className={`${statusClass} px-3 py-2 text-sm font-medium`}
		>
			{name}
		</Link>
	);
}

function getStageStatus(applicant: ApplicantSelect, stageType: StageType) {
	const stageStatus = applicant?.stages?.[stageType]?.status;
	switch (stageStatus) {
		case "in-progress":
			return "rounded-lg bg-[#FFCB78]";
		case "passed":
			return "text-green-500";
		case "failed":
			return "rounded-lg bg-[#7F0000]";
		default:
			return "text-slate-400";
	}
}
