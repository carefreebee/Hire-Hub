import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
}

export default function PageFour({ visible }: PageOneProps) {
	const [organizations, setOrganizations] = useState([{ id: 1 }]);

	const addOrganization = () => {
		setOrganizations([...organizations, { id: organizations.length + 1 }]);
	};
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			{organizations.map((org, index) => (
				<div key={org.id} className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name of Organization" name={`nameOfOrg${index + 1}`} />
					<Input placeholder="Position Held" name={`positionHeld${index + 1}`} />
					<Input placeholder="Inclusive Dates" name={`inclusiveDates${index + 1}`} />
				</div>
			))}
			<Button type="button" onClick={addOrganization} className="mt-4">
				Add More
			</Button>
		</div>
	);
}
