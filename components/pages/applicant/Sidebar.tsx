import { Fragment } from "react";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import Header from "../../sidebar/Header";
import SelectPassedOrFailed from "../authenticated/applicant/screening/SelectPassedOrFailed";
// import DisplayStagesSideBar from "./DisplayStagesSideBar";

export default async function Sidebar({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant, stages } = await getApplicantData(Number(id));
	const initialInterview = applicant?.stages?.initial_interview?.status;
	const isThereRatingForm = applicant?.stages?.initial_interview?.rating_forms_id;
	const fullName = applicant?.first_name + " " + applicant?.last_name;
	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	// const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
	// 	applicant,
	// 	user as User
	// );
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	// const checkIfUserIsAllowedToAssessed = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	// const assessedByUsers = stages?.assessed_by?.includes(user?.role as RoleEnumsType);

	// const checkInitialInterviewForm = applicant?.stages?.initial_interview?.rating_forms_id;
	// const findInProgress = checkStatusInProgress(stages);
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
								{initialInterview === "in-progress" ? (
									user?.role === "recruitment_officer" ? (
										isThereRatingForm?.length! > 0 ? (
											<>
												<p>Initial Interview</p>
												<SelectPassedOrFailed />
											</>
										) : (
											<>
												<p>Initial Interview</p>
												<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-black">
													In Progress
												</p>
											</>
										)
									) : (
										<>
											<p>Intial Interview</p>
											<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-slate-400">
												In Progress
											</p>
										</>
									)
								) : initialInterview === "passed" ? (
									<>
										<p>Initial Interview</p>
										<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-[#039E38]">
											Passed
										</p>
									</>
								) : (
									<>
										<p>Initial Interview</p>
										<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-slate-400">
											In Progress
										</p>
									</>
								)}
							</div>
						</div>
					</div>
					{stages.map((item, index) => {
						return (
							<Fragment key={index}>
								<div className="relative mb-5 flex gap-3">
									<div
										className={`mb-5 flex ${item.status === "in-progress" ? "before:h-16" : "before:h-16"} ${index !== stages.length - 1 ? "before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]" : ""}`}
									>
										<CheckedStatus
											status={item.status as "passed" | "in-progress"}
										/>
									</div>
									<div>
										{item.status === "in-progress" &&
										item.assessed_by?.[0] === user?.id ? (
											<>
												<p className="text-black">{item.name}</p>
												<SelectPassedOrFailed />
											</>
										) : item.status === "in-progress" ? (
											<>
												<p>{item.name}</p>
												<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium">
													In Progress
												</p>
											</>
										) : item.status === "passed" ? (
											<>
												<p>{item.name}</p>
												<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-[#039E38]">
													Passed
												</p>
											</>
										) : (
											<>
												{/* CODE BELOW SHOULD DISPLAY IF THE STATUS WAS PASSED */}
												{/* THERE IS A BUG WHERE THE THE ONE WHO IS NOT THE FINAL ASSESSOR WILL SEE THE COLOR GREEN */}
												<p className="text-slate-400">{item.name}</p>
												<p className="mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium text-slate-400">
													In Progress
												</p>
											</>
										)}
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

function CheckedStatus({ status }: { status: "passed" | "in-progress" }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="mt-1"
		>
			<circle cx="8" cy="8" r="8" fill={`${status === "passed" ? "#7F0000" : "#ffd4d4"}`} />
			<circle cx="8.00002" cy="8.00002" r="3.07692" fill="white" />
		</svg>
	);
}
