"use client";

import { useCurrentRole } from "~/util/zustand";
import SelectPassedOrFailed from "../authenticated/applicant/screening/SelectPassedOrFailed";

type DisplayStagesSideBarProps = {
	status: string;
	assessedBy: string[];
	checkIfUserIsAllowedToAssessed: boolean
};

export default function DisplayStagesSideBar({
	status,
	assessedBy,
	checkIfUserIsAllowedToAssessed,
}: DisplayStagesSideBarProps) {
	const currentRole = useCurrentRole((state) => state.currentRole);
	const isInProgress = status === "in-progress";
	const isPassed = status === "passed";
	const isAssessedByCurrentRole = assessedBy?.[0] === currentRole;

	let className = "mt-2 w-[113px] rounded-xl py-1 text-center text-xs font-medium";

	if (isInProgress && isAssessedByCurrentRole && checkIfUserIsAllowedToAssessed) {
		className += " text-black";
	} else if (isInProgress) {
		className += " bg-[#F9F3E5] text-black";
	} else if (isPassed) {
		className += " bg-[#F9F3E5] text-[#039E38]";
	} else {
		className += " bg-[#F9F3E5] text-slate-400";
	}

	return (
		<p className={className}>
			{isInProgress && isAssessedByCurrentRole && checkIfUserIsAllowedToAssessed ? (
				<SelectPassedOrFailed />
			) : isPassed ? (
				"Passed"
			) : (
				"In Progress"
			)}
		</p>
	);
}
