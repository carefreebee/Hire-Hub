import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageSix({ visible, data }: PageOneProps) {
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				Personal References
				{data.rate.references.map(
					(
						reference: {
							name: string | number | readonly string[] | undefined;
							companyName: string | number | readonly string[] | undefined;
							address: string | number | readonly string[] | undefined;
							contactNumber: string | number | readonly string[] | undefined;
						},
						index: number
					) => (
						<div key={index} className="flex w-full items-center justify-center gap-2">
							<Input
								placeholder="Name"
								name={`referenceName${index + 1}`}
								readOnly
								value={reference.name}
							/>
							<Input
								placeholder="Company Name"
								name={`referenceCompanyName${index + 1}`}
								readOnly
								value={reference.companyName}
							/>
							<Input
								placeholder="Address"
								name={`referenceAddress${index + 1}`}
								readOnly
								value={reference.address}
							/>
							<Input
								placeholder="Contact no."
								name={`referenceContactNum${index + 1}`}
								readOnly
								value={reference.contactNumber}
							/>
						</div>
					)
				)}
			</div>
		</div>
	);
}
