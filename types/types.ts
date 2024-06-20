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
