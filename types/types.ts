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
	name: string
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
	onValueChange?: (value: SelectCategory) => void;
};

export type TextProps = {
	text: string
}

export type SelectCommunicationMode = "email" | "phone_number";
export type SelectCategory = "teaching_staff" | "non-teaching_staff";
export type SelectType = "full_time" | "part_time";

interface JobRequestRecord {
	request_id: number;
	requested_position: string;
	requested_category: "teaching_staff" | "non-teaching_staff";
	requested_department: string | null;
	requested_office: string | null;
	requested_type: "full_time" | "part_time";
	requested_description: string;
	requested_qualification: string;
	requested_date: Date;
	department_id: number | null;
	office_id: number | null;
}

interface DepartmentRecord {
	department_id: number;
	department_name: string;
}

interface OfficeRecord {
	office_id: number;
	office_name: string;
}

