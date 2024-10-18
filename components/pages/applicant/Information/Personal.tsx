import { ScrollArea } from "~/components/ui/scroll-area";
import { ApplicantFormType } from "~/types/types";

interface PersonalInfoProps {
	applicant: ApplicantFormType;
}

export default function PersonalInfo({ applicant }: PersonalInfoProps) {
	console.log("Applicant: ", applicant);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const gender = applicant.gender;
	const civil = applicant.civil_stats;
	const attainment = applicant.educational_attainment;
	const exp = applicant.job_experience;

	const formatMonth = (month: number) => {
		return monthNames[month];
	};

	return (
		<ScrollArea className="h-[30rem]">
			<div className="grid w-full grid-cols-2 gap-5">
				<div>
					<h2 className="mb-2 text-customgray">First Name</h2>
					<h2>{applicant.first_name}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Date applied</h2>
					<h2>
						{applicant.applied_date!.getDate()}{" "}
						{formatMonth(applicant.applied_date!.getMonth())}{" "}
						{applicant.applied_date!.getFullYear()}
					</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Last Name</h2>
					<h2>{applicant.last_name}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Mobile Number</h2>
					<h2>{applicant.contact_number}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Email Address</h2>
					<h2>{applicant.email}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Date of birth</h2>
					<h2>{applicant.birthdate}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Civil Status</h2>
					<h2>
						{civil === "married"
							? "Married"
							: civil === "single"
								? "Single"
								: civil === "widowed"
									? "Widowed"
									: "Invalid Civil Status"}
					</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Gender</h2>
					<h2>
						{gender === "male"
							? "Male"
							: gender === "female"
								? "Female"
								: gender === "prefer_not_to_say"
									? "Prefer Not to Say"
									: "Invalid Gender"}
					</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Address</h2>
					<h2>{applicant.address}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Province</h2>
					<h2>{applicant.province}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">City</h2>
					<h2>{applicant.city}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Barangay</h2>
					<h2>{applicant.baranggay}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Highest Educational Attainment</h2>
					<h2>
						{attainment === "bachelors"
							? "Bachelor's"
							: attainment === "masteral"
								? "Master's"
								: attainment === "doctorate"
									? "Doctorate"
									: "Invalid Attainment"}
					</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Degree/Course</h2>
					<h2>{applicant.degree}</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Job Experience</h2>
					<h2>
						{exp === "entry_level"
							? "Entry Level/ No experience"
							: exp === "experienced"
								? "Experienced Employee (2-4 years)"
								: exp === "advanced"
									? "Advanced Employee (5+ years)"
									: "Invalid Job Experience"}
					</h2>
				</div>
				<div>
					<h2 className="mb-2 text-customgray">Skills</h2>
					<h2>{applicant.skills}</h2>
				</div>
			</div>
		</ScrollArea>
	);
}
