import { useState } from "react";
import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageOne({ visible, data }: PageOneProps) {
	const [siblings, setSiblings] = useState([{ id: 1 }]);

	const addSibling = () => {
		setSiblings([...siblings, { id: siblings.length + 1 }]);
	};
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="First Name"
					name="firstName"
					readOnly
					value={data.rate.firstName}
				/>
				<Input
					placeholder="Last Name"
					name="lastName"
					readOnly
					value={data.rate.lastName}
				/>
				<Input
					placeholder="Middle Name"
					name="middleName"
					readOnly
					value={data.rate.middleName}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Sex" name="sex" readOnly value={data.rate.sex} />
				<Input placeholder="Nickname" name="nickname" readOnly value={data.rate.nickname} />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Permanent Address"
					name="permanentAddress"
					readOnly
					value={data.rate.permanentAddress}
				/>
				<Input
					placeholder="Contact No."
					name="contactNumber"
					readOnly
					value={data.rate.contactNumber}
					className="w-[30%]"
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Present Address"
					name="presentAddress"
					readOnly
					value={data.rate.presentAddress}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Date of Birth"
					name="dateOfBirth"
					readOnly
					value={data.rate.dateOfBirth}
				/>
				<Input
					placeholder="Place of Birth"
					name="placeOfBirth"
					readOnly
					value={data.rate.placeOfBirth}
				/>
				<Input placeholder="Age" name="age" readOnly value={data.rate.age} />
				<Input placeholder="Religion" name="religion" readOnly value={data.rate.religion} />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Citizenship"
					name="citizenship"
					readOnly
					value={data.rate.citizenship}
				/>
				<Input
					placeholder="Civil Status"
					name="civilStatus"
					readOnly
					value={data.rate.civilStatus}
				/>
				<Input placeholder="Height" name="height" readOnly value={data.rate.height} />
				<Input
					placeholder="Weight (in Kgs.)"
					name="weight"
					readOnly
					value={data.rate.weight}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="If married, Spouse Name"
					name="spouseName"
					readOnly
					value={data.rate.spouseName}
				/>
				<Input
					placeholder="Occupation / Name of Employer"
					name="occupation"
					readOnly
					value={data.rate.occupation}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="No. of children"
					name="numOfChildren"
					readOnly
					value={data.rate.numOfChildren}
				/>
				<Input
					placeholder="No. of Dependent Children"
					name="numOfDependent"
					readOnly
					value={data.rate.numOfDependent}
				/>
				<Input
					placeholder="No. of Dependent Children"
					name="numOfOther"
					readOnly
					value={data.rate.numOfOther}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Father's Name"
					name="fatherName"
					readOnly
					value={data.rate.fatherName}
				/>
				<Input
					placeholder="Occupation / Name of Employer"
					name="fatherOccupation"
					readOnly
					value={data.rate.fatherOccupation}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Mother's Name"
					name="motherName"
					readOnly
					value={data.rate.motherName}
				/>
				<Input
					placeholder="Occupation / Name of Employer"
					name="motherOccupation"
					readOnly
					value={data.rate.motherOccupation}
				/>
			</div>
			{data.rate.siblings.map(
				(
					sibling: {
						name: string | number | readonly string[] | undefined;
						occupation: string | number | readonly string[] | undefined;
					},
					index: number | null | undefined
				) => {
					const siblingIndex = index ?? 0;
					return (
						<div
							key={siblingIndex}
							className="flex w-full items-center justify-center gap-2"
						>
							<Input
								placeholder="Brother's and Sister's Name"
								name={`siblingName${siblingIndex + 1}`}
								readOnly
								value={sibling.name}
							/>
							<Input
								placeholder="Occupation / Name of Employer"
								name={`siblingOccupation${siblingIndex + 1}`}
								readOnly
								value={sibling.occupation}
							/>
						</div>
					);
				}
			)}
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Languages and Spoken Understood"
					name="languages"
					readOnly
					value={data.rate.languages}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Special Skills and Talents"
					name="skillsAndTalent"
					readOnly
					value={data.rate.skillsAndTalent}
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Hobbies and outside interest including civil activities"
					name="hobbies"
					readOnly
					value={data.rate.hobbies}
				/>
			</div>
		</div>
	);
}
