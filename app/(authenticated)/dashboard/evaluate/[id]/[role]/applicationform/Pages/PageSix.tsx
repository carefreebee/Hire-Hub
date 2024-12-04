import { Input } from "~/components/ui/input";

interface PageOneProps {
	step: number;
}

export default function PageSix({ step }: PageOneProps) {
	return (
		<div
			className={
				step === 6
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				Personal References
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="referenceNameOne" />
					<Input placeholder="Company Name" name="referenceCompanyNameOne" />
					<Input placeholder="Address" name="referenceAddressOne" />
					<Input placeholder="Contact no." name="referenceContactNumOne" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="referenceNameTwo" />
					<Input placeholder="Company Name" name="referenceCompanyNameTwo" />
					<Input placeholder="Address" name="referenceAddressTwo" />
					<Input placeholder="Contact no." name="referenceContactNumTwo" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="referenceNameThree" />
					<Input placeholder="Company Name" name="referenceCompanyNameThree" />
					<Input placeholder="Address" name="referenceAddressThree" />
					<Input placeholder="Contact no." name="referenceContactNumThree" />
				</div>
			</div>
		</div>
	);
}
