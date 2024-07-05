import dynamic from "next/dynamic";
import HrPageFooter from "~/components/pages/applicant/HrPageFooter";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import AssessedBy from "~/components/pages/authenticated/applicant/AssessedBy";
import Assessor from "~/components/pages/authenticated/applicant/Assessor";
import DownloadForm from "~/components/pages/authenticated/applicant/DownloadForm";
import UploadRatingForm from "~/components/pages/authenticated/applicant/UploadRatingForm";
import ApplicantIDUpdateInitialInterviewFooter from "~/components/pages/authenticated/applicant/initial-interview/ApplicantIDUpdateInitialInterviewFooter";
import SelectMode from "~/components/pages/authenticated/applicant/initial-interview/SelectMode";
import SubmitInitialInterviewForm from "~/components/pages/authenticated/applicant/initial-interview/SubmitInitialInterviewForm";
import { Button } from "~/components/ui/button";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType, User } from "~/lib/schema";
import { checkStatusInProgress } from "~/util/check-status-in-progress";
import { checkUserAndApplicantIfValid } from "~/util/check-user-and-applicant-validation";
import { GetApplicantById } from "~/util/get-applicant-by-id";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() =>
		import(
			"~/components/pages/authenticated/applicant/initial-interview/ApplicantIDDisplayDate"
		),
	{
		ssr: false,
	}
);

export default async function RecommendationForHiringPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// LOCATING THE CURRENT STAGE WHICH IS THE RECOMMENDATION FOR HIRING STAGE
	const { applicant, applicantStage } = await GetApplicantById(
		Number(params.id),
		"recommendation_for_hiring"
	);
	// IF MATCHING THE CURRENT STAGE, IT WILL RETURN THE UPDATED STAGE NAME
	// before -> recommendation_for_hiring, after -> Recommendation for Hiring
	const currentStageName = applicantStage && "Recommendation for Hiring";

	if (user?.role === "hr_head") {
		return (
			<>
				<Card>
					<CardHeader>
						<CardTitle>{currentStageName}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardSubContent>
							<CardTopLeftSubContent>
								<TypographySmall size={"md"}>{currentStageName}</TypographySmall>
								{applicantStage?.status === "in-progress" ? (
									<SelectMode />
								) : (
									<Button variant={"outline"} disabled className="text-[#039E38]">
										{applicantStage?.status}
									</Button>
								)}
							</CardTopLeftSubContent>
							<ApplicantIDDisplayDateNoSSR date={applicantStage?.date as Date} />
						</CardSubContent>
						<CardSubContent>
							<AssessedBy
								status={applicantStage?.status as "passed" | "failed"}
								assessedBy={applicantStage?.assessed_by as RoleEnumsType[]}
							/>
						</CardSubContent>
					</CardContent>
					<CardFooter>
						{applicantStage?.status === "in-progress" ? (
							<ApplicantIDUpdateInitialInterviewFooter id={applicant?.id as number} />
						) : (
							<div className="h-[40px]"></div>
						)}
					</CardFooter>
				</Card>
				<HrPageFooter
					stage="recommendation_for_hiring"
					applicantId={params.id as string}
					evaluatorsId={user?.id as string}
				/>
			</>
		);
	}

	const { stages } = await getApplicantData(Number(params.id));
	// LOCATING THE CURRENT STAGE, IF THE STATUS DOES NOT MATCH
	// THE CURRENT PAGE IT WILL DISPLAY "This applicant is not yet available."
	const findStatusInProgress = checkStatusInProgress(stages);
	// console.log(applicantStage?.status)
	// CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
	const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
		applicant,
		user as User
	);
	// CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
	const checkIfUserIsAllowedToAssessed = isUserDepartmentAllowed || isUserOfficeAllowed;
	// THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
	const assessedByUsers = applicantStage?.assessed_by?.includes(user?.role as RoleEnumsType);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						{currentStageName && "Panel Interview"}
						<DownloadForm
							file={"/files/teaching-demonstration-rating-scaling.docx"}
							downloadText="Recommendation for Hiring Interview Rating Form"
						>
							Download Recommendation for Hiring Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{/* CHECKS IF THE USER's DEPARTMENT/OFFICE MATCHES THE APPLICANT's SELECTED_DEPARTMENT/SELECTED_OFFICE */}
				{applicantStage?.status === "passed" ? (
					<CardContent className="mt-0 h-52 flex-col items-center justify-center">
						<p className="text-xl font-medium">Success!</p>
						<div className="mt-2 flex flex-col items-center">
							<small className="text-[#4F4F4F]">
								Rating form has been submitted successfully, check
							</small>
							<small className="text-[#4F4F4F]">your documents to view file.</small>
						</div>
					</CardContent>
				) : applicantStage?.status === "in-progress" &&
				  !applicantStage.assessed_by?.length ? (
					<CardContent className="mt-0 flex-col items-center justify-center gap-2">
						<p className="text-xl font-medium">Waiting...!</p>
						<small className="text-[#4F4F4F]">
							Wating for HR Head to set the assessor.
						</small>
					</CardContent>
				) : assessedByUsers && checkIfUserIsAllowedToAssessed ? (
					<CardContent className="mt-0 flex h-auto flex-col p-5">
						<InformationSVG />
						<UploadRatingForm />
					</CardContent>
				) : (
					<CardContent className="mt-0 items-center justify-center">
						Not authorized to assess.
					</CardContent>
				)}
				{applicantStage?.status === "in-progress" && (
					<CardFooter className="p-5">
						{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
						<Assessor assessed_by={applicantStage?.assessed_by as RoleEnumsType[]} />
						{/* BELOW IS WHERE THE FORM IS LOCATED SO THAT THE APPLICANT STATUS WILL BE UPDATED */}
						{assessedByUsers && checkIfUserIsAllowedToAssessed && (
							<SubmitInitialInterviewForm
								id={params.id}
								evaluatorsId={user?.id as string}
								recruitment_stage={currentStageName as string}
							/>
						)}
					</CardFooter>
				)}
			</Card>
			<HrPageFooter
				stage="recommendation_for_hiring"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
			/>
		</>
	);
}
