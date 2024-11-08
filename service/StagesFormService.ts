import { revalidatePath } from "next/cache";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { DataExtractor } from "~/DataExtractor/StagesForm";
import { RatingFormsInsert } from "~/lib/schema";
import { StagesFormRepository } from "~/repository/StagesFormRepository";
import { StageType } from "~/types/types";
import { Validator } from "~/Validator/StagesForm";

export class StagesFormService {
	constructor(private readonly stagesFormRepo: StagesFormRepository) {}

	public async insertForm(stagesForm: RatingFormsInsert) {
		try {
			return await this.stagesFormRepo.insertForm(stagesForm);
		} catch (error) {
			console.error("Insert Form failed:", error);
			throw new Error("Insert Form failed");
		}
	}

	public async updateForm(formData: FormData, stageType: StageType) {
		const stagesForm = DataExtractor.extractApplicantStagesForm(formData);
		this.validateForm(stagesForm, stageType);

		try {
			const insertedRatingForm = await this.insertForm(stagesForm);
			const currentApplicant = await getApplicantFormByID(stagesForm.applicant_id);

			if (!currentApplicant) {
				throw new Error("Applicant not found");
			}

			await this.stagesFormRepo.updateStagesForm(
				currentApplicant,
				stageType,
				insertedRatingForm[0].rating_id,
				stagesForm.applicant_id
			);

			revalidatePath(`/dashboard/applicant/${stagesForm.applicant_id}`);
		} catch (error) {
			console.error("Update Applicant Status failed:", error);
			throw new Error("Update Applicant Status failed");
		}
	}

	private validateForm(stagesForm: RatingFormsInsert, stageType: StageType) {
		const validateData = Validator.validateStagesForm(stagesForm);

		if (!validateData.success) {
			throw new Error(`Validation failed for ${stageType}`);
		}
	}
}
