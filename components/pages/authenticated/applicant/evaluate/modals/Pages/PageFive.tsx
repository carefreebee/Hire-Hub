import { Key } from "react";
import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageFive({ visible, data }: PageOneProps) {
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			{data.rate.workExperience.map(
				(
					org: {
						id: Key | null | undefined;
						employer: string | number | readonly string[] | undefined;
						designation: string | number | readonly string[] | undefined;
						dateOfEmployment: string | number | readonly string[] | undefined;
						salary: string | number | readonly string[] | undefined;
						reasonForLeaving: string | number | readonly string[] | undefined;
					},
					index: number
				) => (
					<div key={org.id} className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name & Address of Employer"
							name={`nameOfEmployer${index + 1}`}
							readOnly
							value={org.employer}
						/>
						<Input
							placeholder="Designation"
							name={`designation${index + 1}`}
							readOnly
							value={org.designation}
						/>
						<Input
							placeholder="Date of Employment"
							name={`dateOfEmployment${index + 1}`}
							readOnly
							value={org.dateOfEmployment}
						/>
						<Input
							placeholder="Salary"
							name={`salary${index + 1}`}
							readOnly
							value={org.salary}
						/>
						<Input
							placeholder="Reason for Leaving"
							name={`reasonForLeaving${index + 1}`}
							readOnly
							value={org.reasonForLeaving}
						/>
					</div>
				)
			)}
		</div>
	);
}
