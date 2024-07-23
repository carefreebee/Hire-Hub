import { Fragment } from "react";
import { STATUS } from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import Header from "../../../sidebar/Header";
import CheckedStatus from "./CheckStatus";
import DisplayInitialInterview from "./InitialInterview";
import OtherStages from "./OtherStages";

export default async function Sidebar({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant, stages } = await getApplicantData(Number(id));
	const initialInterview = applicant?.stages?.initial_interview?.status;
	const isThereRatingForm = applicant?.stages?.initial_interview?.rating_forms_id;

	const fullName = applicant?.first_name + " " + applicant?.last_name;

	let filteredStages = stages;
	if (applicant?.office_id !== null && applicant?.selected_office !== null) {
		filteredStages = stages.filter((stage) => stage.name !== "Teaching Demo");
	}

	return (
		<aside className="rounded-md border-2 p-5 shadow-xl">
			<Header
				id={id}
				role={user?.role as RoleEnumsType}
				fullName={fullName}
				email={applicant?.email!}
				positionType={applicant?.positionType!}
				positionApplied={applicant?.position_applied!}
				contactNumber={applicant?.contact_number!}
				communicationType={applicant?.communication_type!}
			/>
			<div className="mb-5">
				<h2 className="my-8 bg-[#EEEEEE] text-center font-semibold text-slate-500">
					Application Status
				</h2>
				<div className="flex flex-col">
					<div className="relative">
						<div
							className={`${initialInterview === "in-progress" ? "before:h-16" : "before:h-16"} mb-5 flex gap-3 before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]`}
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
					</div>
					{filteredStages.map((item, index) => {
						const inProgress = item.status === "in-progress";

						const applicantTeaching = applicant?.department_id !== null;
						const getLastLineTeaching = index !== stages.length - 1;

						const applicantNonTeaching = applicant?.office_id !== null;
						const getLastLineNonTeaching = index !== stages.length - 2;

						return (
							<Fragment key={index}>
								<div className="relative mb-5 flex gap-3">
									<div
										className={`mb-5 flex ${inProgress ? "before:h-16" : "before:h-16"} ${applicantTeaching && getLastLineTeaching && "before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]"} ${applicantNonTeaching && getLastLineNonTeaching && "before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]"}`}
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
