import { STATUS } from "~/constant/constant";
import { RoleEnumsType } from "~/lib/schema";
import SelectPassedOrFailed from "../../authenticated/applicant/screening/SelectPassedOrFailed";

type DisplayInitialInterviewProps = {
	initialInterview: STATUS;
	role: RoleEnumsType;
	length: number;
};

export default function DisplayInitialInterview({
	initialInterview,
	role,
	length,
}: DisplayInitialInterviewProps) {
	const isInProgress = initialInterview === "in-progress";
	const isRecruitmentOfficer = role === "recruitment_officer";
	const shouldShowSelect = isInProgress && isRecruitmentOfficer && length > 0;

	return (
		<>
			{shouldShowSelect ? (
				<>
					<p>Initial Interview</p>
					<SelectPassedOrFailed />
				</>
			) : (
				<InitialInterviewColor initialInterviewStatus={initialInterview} />
			)}
		</>
	);
}

type InitialInterviewColorProps = {
	initialInterviewStatus: STATUS;
};

function InitialInterviewColor({ initialInterviewStatus }: InitialInterviewColorProps) {
	function getStatusClass() {
		switch (initialInterviewStatus) {
			case "passed":
				return "text-[#039E38]";
			case "failed":
				return "text-[#7F0000]";
			case "in-progress":
				return "text-black";
			default:
				return "text-slate-400";
		}
	}

	function getStatusText() {
		switch (initialInterviewStatus) {
			case "passed":
				return "Passed";
			case "failed":
				return "Failed";
			case "in-progress":
				return "In Progress";
			default:
				return "Not started";
		}
	}

	return (
		<>
			<p className={`${getStatusClass()}`}>Initial Interview</p>
			<p
				className={`${getStatusClass()} mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium`}
			>
				{getStatusText()}
			</p>
		</>
	);
}
