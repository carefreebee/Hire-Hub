import { RoleEnumsType } from "~/lib/schema";

export type ComponentChildrenProps = {
	children: React.ReactNode;
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

export type LinksProps = {
	href: string;
	children: React.ReactNode;
	label?: string;
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

export type SelectType = "full_time" | "part_time";

export interface StageStatus {
	status?: "in-progress" | "passed" | "failed" | "";
	date?: Date | "";
	assessed_by?: string[];
	mode?: "online" | "in-person" | "";
	comment_id?: number[];
}

export interface ApplicantStages {
	screening: StageStatus;
	initial_interview: StageStatus;
	teaching_demo: StageStatus;
	psychological_exam: StageStatus;
	panel_interview: StageStatus;
	recommendation_for_hiring: StageStatus;
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
	rate: string;
	recruitment_stage: string;
	created_at: Date | null;
	name: string;
	role: string;
};

export const rolesWithoutDeptAndOffice: RoleEnumsType[] = [
	"user",
	"hr_head",
	"vp_acad_affairs",
	"vp_administration",
	"univ_president",
	"recruitment_officer",
];

export type AssessedByUserDetails = {
	id: string;
	name: string;
	role: string;
};
