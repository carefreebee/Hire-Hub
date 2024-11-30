import { CardFooter } from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-current-stage";
import { AssessorInfo } from "../Card/StatusDisplayComponents";
import { getUserByID } from "~/controller/UsersController"; // Assuming you have a utility to get a user by their ID

interface Assessor {
	name: string;
	role:
		| "user"
		| "admin"
		| "hr_head"
		| "recruitment_officer"
		| "requester_staff"
		| "department_chair"
		| "dean"
		| "faculty"
		| "guidance_center_staff"
		| "vp_acad_affairs"
		| "vp_administration"
		| "univ_president";
}

export default async function CardFooterViewing({ applicantId }: { applicantId: number }) {
	const { user } = await validateRequest();

	// GETTING THE CURRENT STAGE OF THE APPLICANT (e.g. screening, initial_interview)
	const { applicant, applicantStage } = await GetCurrentStage(applicantId, "screening");

	// Determine applicant stage status
	const isPassed = applicantStage?.status === "passed";
	const isFailed = applicantStage?.status === "failed";

	// Initialize assessorInfo as an empty array
	let assessorInfo: Assessor[] = [];
	if (applicantStage?.assessed_by && Array.isArray(applicantStage.assessed_by)) {
		// Iterate over the array of assessor IDs and fetch their details
		const assessorPromises = applicantStage.assessed_by.map(async (assessorId) => {
			const user = await getUserByID(assessorId);
			return user ? { name: user.name || "Unknown", role: user.role } : null;
		});

		const result = await Promise.all(assessorPromises);
		// Filter out null values (in case user is not found)
		assessorInfo = result.filter((assessor): assessor is Assessor => assessor !== null);
	}

	return (
		<>
			{/* Display Assessor Info for each assessor if available */}
			{assessorInfo.length > 0 && (
				<CardFooter className="p-5">
					{assessorInfo.map((assessor, index) => (
						<AssessorInfo
							key={index}
							finalAssessorName={assessor.name || "Unknown Assessor"}
							finalAssessorRole={assessor.role || "Unknown Role"}
						/>
					))}
				</CardFooter>
			)}
		</>
	);
}
