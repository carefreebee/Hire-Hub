import { getApplicantFormByID } from "~/controller/ApplicantController";
import Header from "../../sidebar/Header";

export default async function Sidebar({ id }: { id: string }) {
	const applicant = await getApplicantFormByID(Number(id));
	const fullName = applicant?.first_name + " " + applicant?.last_name;

	const {
		screening,
		teaching_demo,
		panel_interview,
		initial_interview,
		psychological_exam,
		recommendation_for_hiring,
	} = applicant?.stages || {};

	const stages = [
		{ name: "Initial Interview", status: initial_interview?.status },
		{ name: "Teaching Demo", status: teaching_demo?.status },
		{ name: "Psychological Exam", status: psychological_exam?.status },
		{ name: "Panel Interview", status: panel_interview?.status },
		{ name: "Recommendation", status: recommendation_for_hiring?.status },
	];

	return (
		<aside className="rounded-md border-2 p-5 shadow-xl">
			<Header
				id={id}
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
									className={`mb-5 flex gap-3 ${index !== stages.length - 1 ? "before:absolute before:left-[7px] before:top-5 before:h-16 before:w-[1.5px] before:bg-[#7F0000]" : ""}`}
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
									<p
										className={`${item.status === "" && "text-slate-400"} mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium`}
									>
										{item.status === "" ? "In Progress" : ""}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
