import { RoleEnumsType } from "~/lib/schema";

export type ComponentChildrenProps = {
	children: React.ReactNode;
};

export type ApplicantFormType = {
	id: number;
	first_name?: string | null;
	last_name?: string | null;
	email: string;
	gender: "male" | "female" | "prefer_not_to_say"; // Assuming genderEnums resolves to a string type or enum
	birthdate: string;
	address: string;
	province: string;
	city: string;
	baranggay: string;
	civil_stats: "single" | "married" | "widowed"; // Assuming civilStatusEnums resolves to a string type or enum
	educational_attainment: "doctorate" | "masteral" | "bachelors"; // Assuming highestEducationalAttainmentEnums resolves to a string type or enum
	degree: string;
	job_experience: "entry_level" | "experienced" | "advanced"; // Assuming jobExperienceEnums resolves to a string type or enum
	skills?: string | null;
	contact_number?: number | null;
	resume?: {
		resume_name: string;
		resume_url: string;
		letter_name: string;
		letter_url: string;
	} | null;
	communication_type: "email" | "phone_number"; // Assuming communicationEnums resolves to a string type or enum
	positionType: string;
	position_applied: string;
	department_id?: number | null;
	office_id?: number | null;
	selected_department?: string | null;
	selected_office?: string | null;
	applied_date?: Date | null;
	stages?: ApplicantStages | null; // Assuming ApplicantStages is a separate type defined somewhere in your code
};

export type FormContainerProps = {
	label: string;
	type: string;
	name: string;
	minLength?: number;
	maxLength?: number;
	inputMode?:
		| "search"
		| "text"
		| "email"
		| "tel"
		| "url"
		| "none"
		| "numeric"
		| "decimal"
		| undefined;
};

export type RadioGroupProps = {
	label: string;
	name: string;
	FirstRadioGroupItemValue: string;
	FirstRadioGroupItemLabel: string;
	SecondRadioGroupItemValue: string;
	SecondRadioGroupItemLabel: string;
};

export type SelectTagProps = {
	label: string;
	name?: string;
	placeholder: string;
	children: React.ReactNode;
};

export type TextProps = {
	text: string;
};

export type SelectCommunicationMode = "email" | "phone_number";
export type SelectCategory = "teaching_staff" | "non-teaching_staff";
export type SelectCivilStatus = "single" | "married" | "widowed";
export type SelectGender = "male" | "female" | "prefer_not_to_say";
export type SelectHighest = "doctorate" | "masteral" | "bachelors";
export type SelectExperience = "entry_level" | "experienced" | "advanced";

export type SelectType = "full_time" | "part_time";

export interface StageStatus {
	status?: "in-progress" | "passed" | "failed" | "";
	date?: Date | "";
	assessed_by?: string[];
	mode?: "online" | "in-person" | "";
	comment_id?: number[];
}

export interface ApplicantStages {
	screening?: StageStatus | null;
	initial_interview?: StageStatus | null;
	teaching_demo?: StageStatus | null;
	psychological_exam?: StageStatus | null;
	panel_interview?: StageStatus | null;
	recommendation_for_hiring?: StageStatus | null;
}

export type StageType = keyof ApplicantStages;

export type UserNameAndRole = {
	name: string;
	role: RoleEnumsType;
};

export type RatingFormWithUserData = {
	rating_id: number;
	applicant_id: number | null;
	user_id: string | null;
	rate: object;
	recruitment_stage: string;
	created_at: Date | null;
	name: string;
	role: string;
};

export const rolesWithoutDeptAndOffice: RoleEnumsType[] = [
	"admin",
	"user",
	// "hr_head", // Human Resource Department
	// "vp_acad_affairs", // Office of the Vice President for Academic Affairs
	// "vp_administration", // Office
	// "univ_president", // Office
	// "recruitment_officer", // Human Resource Department
];

export type AssessedByUserDetails = {
	id: string;
	name: string;
	role: string;
};

export type ResumeProps = {
	resume_name: string;
	resume_url: string;
	letter_name: string;
	letter_url: string;
};
