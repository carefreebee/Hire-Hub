import { getUsersByUserID } from "~/controller/UsersController";
import { StageStatus } from "~/types/types";
import { formattedApplicantStatus } from "./formatted-name";

export function checkStatusInProgress(stages: StageStatus[]) {
	return stages.find((stage) => stage.status === "in-progress");
}

export function getCurrentStatus(stages: StageStatus[]) {
	const statusInProgress = checkStatusInProgress(stages);

	return {
		currentStatus: formattedApplicantStatus(statusInProgress?.status as string),
		finalSubmitter: statusInProgress?.assessed_by?.[0],
	};
}

export function getSubmitterName(mergedData: any[], role: string) {
	return mergedData.find((data) => data.role === role)?.name || "";
}

export async function mergeRatingFormData(ratingForm: any[]) {
	const mergedData = [];
	for (const form of ratingForm) {
		const user = await getUsersByUserID(form.user_id as string);
		if (user && user.length > 0) {
			mergedData.push({
				...form,
				name: user[0].name,
				role: user[0].role,
			});
		}
	}
	return mergedData;
}
