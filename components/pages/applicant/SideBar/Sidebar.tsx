import { Dispatch, Fragment, SetStateAction } from "react";
import { STATUS } from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import Header from "../../../sidebar/Header";
import CheckedStatus from "./CheckStatus";
import DisplayInitialInterview from "./InitialInterview";
import OtherStages from "./OtherStages";

interface SideBarProps {
	id: string;
}

export default async function Sidebar({ id }: SideBarProps) {
	const { user } = await validateRequest();
	const { applicant, stages } = await getApplicantData(Number(id));
	const initialInterview = applicant?.stages?.initial_interview?.status;
	const isThereRatingForm = applicant?.stages?.initial_interview?.rating_forms_id;

	const fullName = applicant?.first_name + " " + applicant?.last_name;

	// Adjust filtered stages based on conditions
	let filteredStages = stages;
	if (applicant?.office_id !== null && applicant?.selected_office !== null) {
		filteredStages = stages.filter((stage) => stage.name !== "Teaching Demo");
	}

	// Manually add the Screening Stage
	const screeningStage = {
		name: "Screening",
		status: applicant?.stages?.screening?.status || "not-started",
		assessed_by: applicant?.stages?.screening?.assessed_by || [],
		rating_forms_id: [], // Empty array for Screening
	};

	// Manually add the Initial Interview Stage
	const initialInterviewStage = {
		name: "Initial Interview",
		status: initialInterview || "not-started",
		assessed_by: [],
		rating_forms_id: [],
	};

	// Add both stages to the filteredStages array and sort them correctly
	filteredStages = [
		screeningStage,
		initialInterviewStage,
		...filteredStages.filter(
			(stage) => stage.name !== "Screening" && stage.name !== "Initial Interview"
		),
	].sort((a, b) => {
		const order = [
			"Screening",
			"Initial Interview",
			"Teaching Demo",
			"Psychological Exam",
			"Panel Interview",
			"Recommendation",
		];
		return order.indexOf(a.name) - order.indexOf(b.name);
	});

	return (
		<aside className="rounded-md border-2 p-5 shadow-xl">
			<Header
				id={id}
				role={user?.role as RoleEnumsType}
				fullName={fullName}
				applicant={applicant!}
			/>
			<div className="mb-5">
				<h2 className="my-8 bg-[#EEEEEE] text-center font-semibold text-slate-500">
					Application Status
				</h2>
				<div className="flex flex-col">
					{/* Initial Interview Stage */}
					{/* <div className="relative">
						<div
							className={`mb-5 flex gap-3 before:absolute before:left-[7px] before:top-5 before:w-[1.5px] ${initialInterview === "in-progress" ? "before:h-16" : "before:h-16"} before:bg-[#7F0000]`}
						>
							<CheckedStatus status={initialInterview as "passed" | "in-progress"} />
							<div className="flex flex-col">
								<DisplayInitialInterview
									initialInterview={initialInterview as STATUS}
									role={user?.role as RoleEnumsType}
									length={isThereRatingForm?.length || 0}
								/>
							</div>
						</div>
					</div> */}

					{/* Display All Stages */}
					{filteredStages.map((item, index) => {
						const inProgress = item.status === "in-progress";
						return (
							<Fragment key={index}>
								<div className="relative mb-5 flex gap-3">
									<div
										className={`mb-5 flex ${inProgress ? "before:h-16" : "before:h-16"} before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]`}
									>
										<CheckedStatus
											status={item.status as "passed" | "in-progress"}
										/>
									</div>
									<div>
										<OtherStages
											status={item.status as string}
											assessedBy={item.assessed_by as string[]}
											name={item.name as string}
											userId={user?.id as string}
										/>
									</div>
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>
		</aside>
	);
}
