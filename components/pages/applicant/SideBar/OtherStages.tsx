import SelectPassedOrFailed from "../../authenticated/applicant/screening/SelectPassedOrFailed";

type OtherStagesProps = {
	status: string;
	assessedBy: string[];
	name: string;
	userId: string;
};

export default function OtherStages({ status, assessedBy, name, userId }: OtherStagesProps) {
	function getStatusClass() {
		switch (status) {
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
		switch (status) {
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
			{status === "in-progress" && assessedBy?.[0] === userId ? (
				<>
					<p className="text-black">{name}</p>
					<SelectPassedOrFailed />
				</>
			) : (
				<>
					<p className={getStatusClass()}>{name}</p>
					<p
						className={`mt-2 w-[113px] rounded-xl bg-[#F9F3E5] py-1 text-center text-xs font-medium ${getStatusClass()}`}
					>
						{getStatusText()}
					</p>
				</>
			)}
		</>
	);
}
