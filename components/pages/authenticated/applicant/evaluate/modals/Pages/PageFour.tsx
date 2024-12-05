import { Key } from "react";
import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageFour({ visible, data }: PageOneProps) {
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			{data.rate.organizations.map(
				(
					org: {
						id: Key | null | undefined;
						name: string | number | readonly string[] | undefined;
						position: string | number | readonly string[] | undefined;
						dates: string | number | readonly string[] | undefined;
					},
					index: number
				) => (
					<div key={org.id} className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name of Organization"
							name={`nameOfOrg${index + 1}`}
							readOnly
							value={org.name}
						/>
						<Input
							placeholder="Position Held"
							name={`positionHeld${index + 1}`}
							readOnly
							value={org.position}
						/>
						<Input
							placeholder="Inclusive Dates"
							name={`inclusiveDates${index + 1}`}
							readOnly
							value={org.dates}
						/>
					</div>
				)
			)}
		</div>
	);
}
