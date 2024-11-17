import { revalidatePath } from "next/cache";
import { getApplicantFormByID } from "~/controller/ApplicantFormController";
import { DataExtractor } from "~/extractors/RatingForms";
import { ApplicantSelect } from "~/lib/schema";
import { RatingFormsRepository } from "~/Repository/RatingFormsRepository";
import { StageType } from "~/types/types";

export class RatingFormsService {
	constructor(private ratingFormsRepo: RatingFormsRepository) {}

	public async getAllRaitingFormById(id: number) {
		try {
			return await this.ratingFormsRepo.getAllRaitingFormById(id);
		} catch (error) {
			throw new Error("Fetching all rating forms failed");
		}
	}

	public async getAllRaitingFormByIdInEachStages(applicantId: number, ratingFormId: number[]) {
		try {
			return await this.ratingFormsRepo.getAllRaitingFormByIdInEachStages(
				applicantId,
				ratingFormId
			);
		} catch (error) {
			throw new Error("Fetching all rating forms failed");
		}
	}

	public async getAllRatingFormsFilesById(id: number) {
		try {
			return await this.ratingFormsRepo.getAllRatingFormsFilesById(id);
		} catch (error) {
			throw new Error("Fetching all rating forms failed");
		}
	}

	public async getAllApplicantRatingForms() {
		try {
			return await this.ratingFormsRepo.getAllApplicantRatingForms();
		} catch (error) {
			throw new Error("Fetching all rating forms failed");
		}
	}

	public async getRatingFormsById(id: number) {
		try {
			return await this.ratingFormsRepo.getRatingFormsById(id);
		} catch (error) {
			throw new Error("Fetching rating forms by ID failed");
		}
	}

	public async updateEvaluateApplicantStatus(formData: FormData) {
		const updateEvaluate = DataExtractor.extractRatingFormData(formData);

		this.validateStatus(updateEvaluate.status);

		try {
			const currentApplicant = await this.fetchApplicant(updateEvaluate.applicantId);

			const stageOrder: StageType[] = [
				"initial_interview",
				"teaching_demo",
				"psychological_exam",
				"panel_interview",
				"recommendation_for_hiring",
			];

			await this.updateApplicantStage(
				stageOrder,
				currentApplicant,
				updateEvaluate.applicantId,
				updateEvaluate.status
			);

			revalidatePath(`/dashboard/applicant/${updateEvaluate.applicantId}`);
		} catch (error) {
			console.error("Update Evaluate Applicant Status failed:", error);
			throw new Error("Update Evaluate Applicant Status failed");
		}
	}

	private async updateApplicantStage(
		stageOrder: StageType[],
		currentApplicant: ApplicantSelect,
		applicantId: number,
		status: "passed" | "failed"
	) {
		// Remove 'teaching_demo' stage if office_id is present
		if (currentApplicant.office_id !== null) {
			stageOrder = stageOrder.filter((stage) => stage !== "teaching_demo");
		}

		for (let i = 0; i < stageOrder.length; i++) {
			const stage = stageOrder[i];
			const nextStage = stageOrder[i + 1];

			if (this.StageStatus(currentApplicant, stage) !== "passed") {
				if (stage === "recommendation_for_hiring") {
					await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
						currentApplicant,
						stage,
						applicantId,
						status
					);
					break;
				} else {
					await this.ratingFormsRepo.updateCurrentApplicantEvaluate(
						currentApplicant,
						stage,
						applicantId,
						status,
						nextStage
					);
					break;
				}
			}
		}
	}

	private StageStatus(currentApplicant: ApplicantSelect, stage: StageType) {
		return currentApplicant?.stages?.[stage]?.status;
	}

	private async fetchApplicant(applicantId: number) {
		const applicant = await getApplicantFormByID(applicantId);
		if (!applicant) {
			throw new Error("Applicant not found");
		}
		return applicant;
	}

	private validateStatus(status: string) {
		const requiredFields = ["passed", "failed"];
		if (!requiredFields.includes(status)) {
			throw new Error(
				"Please don't forget to update the applicant status as passed or failed"
			);
		}
	}
}
