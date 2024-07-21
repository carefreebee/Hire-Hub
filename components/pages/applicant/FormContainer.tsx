import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { FormContainerProps, RadioGroupProps } from "~/types/types";
import DownloadForm from "../authenticated/applicant/Card/DownloadForm";

export function FormContainer({ label, type, name, minLength, maxLength, inputMode }: FormContainerProps) {
	return (
		<div className="flex flex-col gap-3">
			<Label className="font-semibold">{label}</Label>
			<Input
				type={type}
				name={name}
				required
				minLength={minLength}
				maxLength={maxLength}
				inputMode={inputMode}
			/>
		</div>
	);
}

export function RadioGroupContainer({
	label,
	name,
	FirstRadioGroupItemValue,
	FirstRadioGroupItemLabel,
	SecondRadioGroupItemValue,
	SecondRadioGroupItemLabel,
}: RadioGroupProps) {
	return (
		<div className="h-[66px]">
			<Label className="font-semibold">{label}</Label>
			<div className="mt-3 font-semibold">
				<RadioGroup name={name} className="flex">
					<div className="flex flex-1 items-center space-x-2">
						<RadioGroupItem value={FirstRadioGroupItemValue} id="r1" />
						<Label htmlFor="r1" className="font-semibold">
							{FirstRadioGroupItemLabel}
						</Label>
					</div>
					<div className="flex flex-1 items-center space-x-2">
						<RadioGroupItem value={SecondRadioGroupItemValue} id="r2" />
						<Label htmlFor="r2" className="font-semibold">
							{SecondRadioGroupItemLabel}
						</Label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}

export function SelectTag() {
	return (
		<div className="flex h-[66px] flex-col gap-3">
			<Label className="font-semibold">
				Choose the college/ department you are applying for:
			</Label>
			<Select name="selected_department_or_office" required>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Choose a department..." />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

export function Note() {
	return (
		<div>
			<p className="text-sm font-semibold">
				Note: Click{" "}
				<DownloadForm
					file={"/files/applicant-employment.pdf"}
					downloadText="Applicant Employment"
				>
					<span className="text-[#7F0000]">here</span>
				</DownloadForm>{" "}
				to download the application for employment form and fill-up the necessary
				information.
			</p>
			<p className="my-3 text-sm font-semibold">
				Attach the completed application form including your application letter
			</p>
		</div>
	);
}