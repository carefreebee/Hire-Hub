import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ApplicantSelect } from "~/lib/schema";

interface PageOneProps {
	visible: boolean;
	applicant: ApplicantSelect;
}

export default function PageOne({ visible, applicant }: PageOneProps) {
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
					readOnly
					value={applicant?.first_name || ""}
					placeholder="First Name"
					name="firstName"
				/>
				<Input
					readOnly
					value={applicant?.last_name || ""}
					placeholder="Last Name"
					name="lastName"
				/>
				<Input placeholder="Middle Name" name="middleName" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input readOnly value={applicant?.gender} placeholder="Sex" name="sex" />
				<Input placeholder="Nickname" name="nickname" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					readOnly
					value={applicant?.address}
					placeholder="Permanent Address"
					name="permanentAddress"
				/>
				<Input
					readOnly
					value={applicant?.contact_number || ""}
					placeholder="Contact No."
					name="contactNumber"
					className="w-[30%]"
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Present Address" name="presentAddress" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					readOnly
					value={applicant?.birthdate}
					placeholder="Date of Birth"
					name="dateOfBirth"
				/>
				<Input placeholder="Place of Birth" name="placeOfBirth" />
				<Input placeholder="Age" name="age" />
				<Input placeholder="Religion" name="religion" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Citizenship" name="citizenship" />
				<Input
					readOnly
					value={applicant?.civil_stats}
					placeholder="Civil Status"
					name="civilStatus"
				/>
				<Input placeholder="Height" name="height" />
				<Input placeholder="Weight (in Kgs.)" name="weight" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="If married, Spouse Name" name="spouseName" />
				<Input placeholder="Occupation / Name of Employer" name="occupation" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="No. of children" name="numOfChildren" />
				<Input placeholder="No. of Dependent Children" name="numOfDependent" />
				<Input placeholder="No. of Dependent Children" name="numOfOther" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Father's Name" name="fatherName" />
				<Input placeholder="Occupation / Name of Employer" name="fatherOccupation" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Mother's Name" name="motherName" />
				<Input placeholder="Occupation / Name of Employer" name="motherOccupation" />
			</div>
			{siblings.map((sibling, index) => (
				<div key={sibling.id} className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Brother's and Sister's Name"
						name={`siblingName${index + 1}`}
					/>
					<Input
						placeholder="Occupation / Name of Employer"
						name={`siblingOccupation${index + 1}`}
					/>
				</div>
			))}
			<Button type="button" onClick={addSibling} className="mt-4">
				Add More Siblings
			</Button>
			<div className="flex w-full items-center justify-center gap-2">
				<Input placeholder="Languages and Spoken Understood" name="languages" />
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					value={applicant?.skills || ""}
					placeholder="Special Skills and Talents"
					name="skillsAndTalent"
				/>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<Input
					placeholder="Hobbies and outside interest including civil activities"
					name="hobbies"
				/>
			</div>
		</div>
	);
}
