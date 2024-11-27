import { CardFooter } from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-current-stage";
import { AssessorInfo } from "../Card/StatusDisplayComponents";
import UpdateDate from "../Card/UdpateDate";
import UpdateStatus from "../Card/UdpateStatus";
import { getUserByID } from "~/controller/UsersController"; // Assuming you have a utility to get a user by their ID

interface Assessor {
	name: string;
	role: "user" | "admin" | "hr_head" | "recruitment_officer" | "requester_staff" | "department_chair" | "dean" | "faculty" | "guidance_center_staff" | "vp_acad_affairs" | "vp_administration" | "univ_president";
}

// interface Assessor {
// 	name: string;
// 	role: string;
// }

export default async function CardFooterComponent({ applicantId }: { applicantId: number }) {
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
			// Only include valid users (i.e. non-null)
			return user ? { name: user.name || "Unknown", role: user.role } : null;
		});

		const result = await Promise.all(assessorPromises);
		// Filter out null values (in case user is not found)
		assessorInfo = result.filter((assessor): assessor is Assessor => assessor !== null);
	}

	return (
		<>
			{/* Show Update Date if the applicant stage doesn't have a date and the user is a Recruitment Officer */}
			{!applicantStage?.date &&
			(user?.role === "dean" || user?.role === "department_chair") ? (
				<CardFooter>
					<UpdateDate id={applicant?.id as number} date={applicantStage?.date as Date} />
				</CardFooter>
			) : !isPassed &&
			  !isFailed &&
			  (user?.role === "dean" || user?.role === "department_chair") ? (
				// If applicant is neither passed nor failed and the user is a Recruitment Officer, show UpdateStatus
				<CardFooter>
					<UpdateStatus
						id={applicant?.id as number}
						assessorId={user?.id as string} // Send the current user's ID as the assessor
					/>
				</CardFooter>
			) : (
				// If applicant has passed or failed, show Assessor Info for each assessor
				(isPassed || isFailed) &&
				assessorInfo.length > 0 && (
					<CardFooter className="p-5">
						{assessorInfo.map((assessor, index) => (
							<AssessorInfo
								key={index}
								finalAssessorName={assessor.name || "Unknown Assessor"}
								finalAssessorRole={assessor.role || "Unknown Role"}
							/>
						))}
					</CardFooter>
				)
			)}
		</>
	);
}