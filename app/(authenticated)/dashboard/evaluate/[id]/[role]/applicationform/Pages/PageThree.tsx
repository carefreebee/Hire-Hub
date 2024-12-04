import { Input } from "~/components/ui/input";

interface PageOneProps {
	step: number;
}

export default function PageThree({ step }: PageOneProps) {
	return (
		<div
			className={
				step === 3
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Present Health Conditions" name="presentHealth" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Have you had any illnesses, hospitilization or accidents"
					name="illnesses"
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="If so, please specifiy illness, date etc."
					name="specifyIllness"
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Physical defects, if any" name="physicalDefects" />
				<Input placeholder="Any distinguish mark/s" name="distinguish" />
			</div>
		</div>
	);
}
