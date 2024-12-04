import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface PageOneProps {
	step: number;
}

export default function PageFive({ step }: PageOneProps) {
	const [workExp, setWorkExp] = useState([{ id: 1 }]);

	const addWorkExp = () => {
		setWorkExp([...workExp, { id: workExp.length + 1 }]);
	};
	return (
		<div
			className={
				step === 5
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			{workExp.map((org, index) => (
				<div key={org.id} className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Name & Address of Employer"
						name={`nameOfEmployer${index + 1}`}
					/>
					<Input placeholder="Designation" name={`designation${index + 1}`} />
					<Input placeholder="Date of Employment" name={`dateOfEmployment${index + 1}`} />
					<Input placeholder="Salary" name={`salary${index + 1}`} />
					<Input placeholder="Reason for Leaving" name={`reasonForLeaving${index + 1}`} />
				</div>
			))}
			<Button type="button" onClick={addWorkExp} className="mt-4">
				Add More
			</Button>
		</div>
	);
}
