import { StageType } from "~/types/types";

export function filterStagesByOffice(
	office_id: number | null,
	selected_office: string | null,
	stages: StageType[]
) {
	if (office_id !== null && selected_office !== null) {
		return stages.filter((stage) => stage !== "teaching_demo");
	}
	return stages;
}
