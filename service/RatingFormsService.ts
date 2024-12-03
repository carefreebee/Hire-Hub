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

	public async createRatingForm(formData: FormData) {
		const jobFitQuestions = {
			experience: {
				question: formData.get("jobFitQuestion1") as string,
				response: formData.get("jobFitResponse1") as string,
				rating: parseInt(formData.get("jobFitRating1") as string),
			},
			competence: {
				question: formData.get("jobFitQuestion2") as string,
				response: formData.get("jobFitResponse2") as string,
				rating: parseInt(formData.get("jobFitRating2") as string),
			},
			contribution: {
				question: formData.get("jobFitQuestion3") as string,
				response: formData.get("jobFitResponse3") as string,
				rating: parseInt(formData.get("jobFitRating3") as string),
			},
		};

		const cultureAddQuestions = {
			cultureOfExcellence: {
				question: formData.get("cultureAddQuestion1") as string,
				response: formData.get("cultureAddResponse1") as string,
				rating: parseInt(formData.get("cultureAddRating1") as string),
			},
			integrity: {
				question: formData.get("cultureAddQuestion2") as string,
				response: formData.get("cultureAddResponse2") as string,
				rating: parseInt(formData.get("cultureAddRating2") as string),
			},
			teamwork: {
				question: formData.get("cultureAddQuestion3") as string,
				response: formData.get("cultureAddResponse3") as string,
				rating: parseFloat(formData.get("cultureAddRating3") as string),
			},
			universality: {
				question: formData.get("cultureAddQuestion4") as string,
				response: formData.get("cultureAddResponse4") as string,
				rating: parseInt(formData.get("cultureAddRating4") as string),
			},
		};

		const ratingForm = {
			applicant_id: parseInt(formData.get("applicantId") as string, 10),
			user_id: formData.get("userId") as string,
			rate: {
				applicantName: formData.get("applicantName") as string,
				positionDesired: formData.get("positionDesired") as string,
				departmentOffice: formData.get("departmentOffice") as string,
				jobFitRating: formData.get("jobFit") as string,
				cultureAddQuestionsRating: formData.get("cultureAdd") as string,
				initialInterviewRating: formData.get("initialInterviewRating") as string,
				jobFit: jobFitQuestions,
				cultureAdd: cultureAddQuestions,
				considerations: formData.get("considerations") as string,
				questions: formData.get("questions") as string,
				response: formData.get("response") as string,
				expectedMonthlySalary: formData.get("expectedMonthlySalary") as string,
				recommendations: formData.get("recommendations") as string,
				evaluatedBy: formData.get("evaluatedBy") as string,
			},
			recruitment_stage: formData.get("recruitment_stage") as string,
			created_at: new Date(),
		};

		try {
			return await this.ratingFormsRepo.insertForm(ratingForm);
		} catch (error) {
			console.error("Error creating rating form:", error);
			throw new Error("Creating rating form failed");
		}
	}

	public async teachingDemoForm(formData: FormData) {
		const sections = ["personality", "preparation", "teachingProcess", "communicationSkills"];

		const rate: any = {};

		sections.forEach((section, sectionIndex) => {
			rate[section] = {};
			let questionIndex = 0;
			while (formData.has(`question-${sectionIndex}-${questionIndex}`)) {
				const questionValue = formData.get(
					`question-${sectionIndex}-${questionIndex}`
				) as string;
				const ratingValue = formData.get(`rating-${sectionIndex}-${questionIndex}`);

				rate[section][`question${questionIndex + 1}`] = {
					question: questionValue,
					rating:
						typeof ratingValue === "string"
							? parseInt(ratingValue.split("-").pop() || "0")
							: 0,
				};
				questionIndex++;
			}
		});

		const teachingDemoForm = {
			applicant_id: parseInt(formData.get("applicantId") as string, 10),
			user_id: formData.get("userId") as string,
			rate: {
				applicantName: formData.get("applicantName") as string,
				topic: formData.get("topic") as string,
				departmentOffice: formData.get("departmentOffice") as string,
				date: formData.get("date") as string,
				comments: formData.get("comments") as string,
				sections: rate,
				overAll: parseInt(formData.get("rating") as string),
			},
			recruitment_stage: formData.get("recruitment_stage") as string,
			created_at: new Date(),
		};

		try {
			return await this.ratingFormsRepo.insertForm(teachingDemoForm);
		} catch (error) {
			console.error("Error creating teaching demo form:", error);
			throw new Error("Creating teaching demo form failed");
		}
	}
	public async panelInterviewForm(formData: FormData) {
		const factors = [
			"appearanceAndMannerisms",
			"mannerOfSpeaking",
			"physicalCondition",
			"abilityToGraspIdeasQuickly",
			"abilityToOrganizeIdeas",
			"abilityToGetAlongWithOthers",
			"selfConfidenceInitiativeAndSelfAssertion",
			"reasoningAndJudgment",
			"emotionalStabilityAndMaturity",
			"experienceInWorkAppliedFor",
		];

		const rate: any = {};
		factors.forEach((factor, index) => {
			rate[factor.replace(/ /g, "").toLowerCase()] = {
				rating: parseInt(formData.get(`rating-${index}`) as string),
				comment: formData.get(`comment-${index}`) as string,
			};
		});
		rate.recommendations = {
			unfavorable: formData.get("unfavorable") as string,
			comparison: formData.get("comparison") as string,
			effective: formData.get("effective") as string,
		};

		const panelInterviewForm = {
			applicant_id: parseInt(formData.get("applicantId") as string, 10),
			user_id: formData.get("userId") as string,
			rate: {
				applicantName: formData.get("applicantName") as string,
				position: formData.get("positionApplied") as string,
				college: formData.get("college") as string,
				department: formData.get("departmentOffice") as string,
				sections: rate,
			},
			recruitment_stage: formData.get("recruitment_stage") as string,
			created_at: new Date(),
		};

		console.log("Panel interview form data:", panelInterviewForm); // Debug log

		try {
			return await this.ratingFormsRepo.insertForm(panelInterviewForm);
		} catch (error) {
			console.error("Error creating panel interview form:", error);
			throw new Error("Creating panel interview form failed");
		}
	}
}
