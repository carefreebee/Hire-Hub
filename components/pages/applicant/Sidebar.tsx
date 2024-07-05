import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType, User } from "~/lib/schema";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import Header from "../../sidebar/Header";
import DisplayStagesSideBar from "./DisplayStagesSideBar";

export default async function Sidebar({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant, stages } = await getApplicantData(Number(id));
	const fullName = applicant?.first_name + " " + applicant?.last_name;
	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
		applicant,
		user as User
	);
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	const checkIfUserIsAllowedToAssessed = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	// const assessedByUsers = stages?.assessed_by?.includes(user?.role as RoleEnumsType);

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
					{stages.map((item, index) => (
						<div key={index}>
							<div className="relative mb-5 flex gap-3">
								<div
									className={`mb-5 flex ${item.status === "in-progress" ? "before:h-20" : "before:h-16"} ${index !== stages.length - 1 ? "before:absolute before:left-[7px] before:top-5 before:w-[1.5px] before:bg-[#7F0000]" : ""}`}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="mt-1"
									>
										<circle
											cx="8"
											cy="8"
											r="8"
											fill={`${item.status === "passed" ? "#7F0000" : "#ffd4d4"}`}
										/>
										<circle
											cx="8.00002"
											cy="8.00002"
											r="3.07692"
											fill="white"
										/>
									</svg>
								</div>
								<div>
									<p>{item.name}</p>
									<DisplayStagesSideBar
										status={item.status as string}
										assessedBy={item.assessed_by as string[]}
										checkIfUserIsAllowedToAssessed={
											checkIfUserIsAllowedToAssessed
										}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
