import dynamic from "next/dynamic";
import CommentsAndDocuments from "~/components/pages/applicant/CommentsAndDocuments";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/ApplicantIDCard";
import DownloadForm from "~/components/pages/authenticated/applicant/DownloadForm";
import SubmitInitialInterviewForm from "~/components/pages/authenticated/applicant/initial-interview/SubmitInitialInterviewForm";
import ApplicantIDUpdateDateFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateDateFooter";
import ApplicantIDUpdateStatusFooter from "~/components/pages/authenticated/applicant/screening/ApplicantIDUpdateStatusFooter";
import UploadRatingForm from "~/components/pages/authenticated/applicant/UploadRatingForm";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRatingFormsFilesById } from "~/controller/RatingFormsController";
import { validateRequest } from "~/lib/auth";
import { GetCurrentStage } from "~/util/get-applicant-by-id";

const ApplicantIDDisplayDateNoSSR = dynamic(
	() =>
		import(
			"~/components/pages/authenticated/applicant/initial-interview/ApplicantIDDisplayDate"
		),
	{
		ssr: false,
	}
);

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// LOCATING THE CURRENT STAGE WHICH IS THE INITIAL INTERVIEW STAGE
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"initial_interview"
	);
	console.log(applicantStage);
	// IF MATCHING THE CURRENT STAGE, IT WILL RETURN THE UPDATED STAGE NAME
	// before -> initial_interview, after -> Initial Interview
	const currentStageName = "Initial Interview";
	// const isApplicantInProgress = applicantStage?.status === "in-progress";
	const isRecruitmentOfficer = user?.role === "recruitment_officer";
	// const isStatusPassed = applicantStage?.status === "passed";

	// const getUserWhoAssessed = await getUsersByUserID(applicantStage?.assessed_by?.[0] ?? "");
	// const assessedBy = getUserWhoAssessed?.find((user) => ({
	// 	name: user.name,
	// 	role: user.role,
	// }));

	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	const isRatingFormSubmitted = ratingForm?.length > 0;
	console.log(isRatingFormSubmitted);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between">
						{currentStageName}
						<DownloadForm
							file={"/files/initial-interview-rating-form.xlsx"}
							downloadText="Initial Interview Rating Form"
						>
							Download Initial Interview Rating Form
						</DownloadForm>
					</CardTitle>
				</CardHeader>
				{isRecruitmentOfficer && !applicantStage?.date ? (
					<>
						<CardContent>
							<CardSubContent>
								<CardTopLeftSubContent>
									<TypographySmall size={"md"}>
										{currentStageName}
									</TypographySmall>
								</CardTopLeftSubContent>
								<ApplicantIDDisplayDateNoSSR date={applicantStage?.date as Date} />
							</CardSubContent>
							<CardSubContent>
								{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
								{/* <Assessor
									finalAssessorName={finalAssessor?.name as string}
									finalAssessorRole={finalAssessor?.role as string}
								/> */}
							</CardSubContent>
						</CardContent>
						<CardFooter>
							{!applicantStage?.date && isRecruitmentOfficer ? (
								<ApplicantIDUpdateDateFooter
									id={applicant?.id as number}
									date={applicantStage?.date as Date}
								/>
							) : applicantStage?.status !== "passed" && isRecruitmentOfficer ? (
								<ApplicantIDUpdateStatusFooter
									id={applicant?.id as number}
									assessorId={user?.id as string}
								/>
							) : (
								<div className="h-[40px]"></div>
							)}
						</CardFooter>
					</>
				) : !isRatingFormSubmitted ? (
					<>
						<CardContent className="mt-0 flex h-auto flex-col p-5">
							<InformationSVG />
							<UploadRatingForm />
						</CardContent>
						<CardFooter className="justify-end px-5 py-4">
							<SubmitInitialInterviewForm
								id={params.id}
								evaluatorsId={user?.id as string}
								recruitment_stage={currentStageName as string}
							/>
						</CardFooter>
					</>
				) : user?.role === "recruitment_officer" ? (
					<CardContent className="mt-0 h-52 flex-col items-center justify-center">
						<p className="text-xl font-medium">Success!</p>
						<div className="mt-2 flex flex-col items-center">
							<small className="text-[#4F4F4F]">
								Rating form has been submitted successfully, check{" "}
							</small>
							<small className="text-[#4F4F4F]">your documents to view file.</small>
						</div>
					</CardContent>
				) : (
					<CardContent className="mt-0 flex-col items-center justify-center gap-2">
						<p>You have no access to this stage.</p>
					</CardContent>
				)}
			</Card>
			<CommentsAndDocuments
				stage="initial_interview"
				applicantId={params.id as string}
				evaluatorsId={user?.id as string}
			/>
		</>
	);
}

// return (
// 	<>
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>{currentStageName}</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				<CardSubContent>
// 					<CardTopLeftSubContent>
// 						<TypographySmall size={"md"}>{currentStageName}</TypographySmall>
// 						{isApplicantInProgress && isRecruitmentOfficer ? (
// 							<SelectMode />
// 						) : (
// 							<Button
// 								variant={"outline"}
// 								disabled
// 								className={`${isStatusPassed ? "text-[#039E38]" : "text-black"}`}
// 							>
// 								{formattedApplicantStatus(applicantStage?.status as string)}
// 							</Button>
// 						)}
// 					</CardTopLeftSubContent>
// 					<ApplicantIDDisplayDateNoSSR date={applicantStage?.date as Date} />
// 				</CardSubContent>
// 				<CardSubContent>
// 					<AssessedBy
// 						status={applicantStage?.status as "passed" | "failed"}
// 						assessedBy={applicantStage?.assessed_by as RoleEnumsType[]}
// 					/>
// 				</CardSubContent>
// 			</CardContent>
// 			<CardFooter>
// 				{isApplicantInProgress && isRecruitmentOfficer ? (
// 					<ApplicantIDUpdateInitialInterviewFooter id={applicant?.id as number} />
// 				) : (
// 					<div className="h-[40px]"></div>
// 				)}
// 			</CardFooter>
// 		</Card>
// 		<CommentsAndDocuments
// 			stage="initial_interview"
// 			applicantId={params.id as string}
// 			evaluatorsId={user?.id as string}
// 		/>
// 	</>
// );

// // CHECK IF THE BOTH USER AND APPLICANT HAS THE SAME VALUES WHETHER IT IS DEPARTMENT OR OFFICE
// const { isUserDepartmentAllowed, isUserOfficeAllowed } = checkUserAndApplicantIfValid(
// 	applicant,
// 	user as User
// );
// // CHECK IF THE USER IS ALLOWED TO ASSESSED THE APPLICANT WHETHER IT IS DEPARTMENT OR OFFICE
// const checkIfUserIsAllowedToAssessed = isUserDepartmentAllowed || isUserOfficeAllowed;
// // THESE ARE THE USER's WHO CAN ASSESS TO THE APPLICANT
// const assessedByUsers = applicantStage?.assessed_by?.includes(user?.role as RoleEnumsType);

// // console.log(assessedByUsers);
// console.log(isUserDepartmentAllowed);

// return (
// 	<>
// 		<Card>
// 			<CardHeader>
// 				<CardTitle className="flex justify-between">
// 					<p>{currentStageName}</p>
// 					<DownloadForm
// 						file={"/files/initial-interview-rating-form.xlsx"}
// 						downloadText="Intial Interview Rating Form"
// 					>
// 						Download Inital Interview Rating Form
// 					</DownloadForm>
// 				</CardTitle>
// 			</CardHeader>
// 			{/* CHECKS IF THE USER's DEPARTMENT/OFFICE MATCHES THE APPLICANT's SELECTED_DEPARTMENT/SELECTED_OFFICE */}
// 			{applicantStage?.status === "passed" ? (
// 				<CardContent className="mt-0 h-52 flex-col items-center justify-center">
// 					<p className="text-xl font-medium">Success!</p>
// 					<div className="mt-2 flex flex-col items-center">
// 						<small className="text-[#4F4F4F]">
// 							Rating form has been submitted successfully, check
// 						</small>
// 						<small className="text-[#4F4F4F]">your documents to view file.</small>
// 					</div>
// 				</CardContent>
// 			) : applicantStage?.status === "in-progress" &&
// 			  !applicantStage.assessed_by?.length ? (
// 				<CardContent className="mt-0 flex-col items-center justify-center gap-2">
// 					<p className="text-xl font-medium">Waiting...!</p>
// 					<small className="text-[#4F4F4F]">
// 						Wating for HR Head to set the assessor.
// 					</small>
// 				</CardContent>
// 			) : assessedByUsers && checkIfUserIsAllowedToAssessed ? (
// 				<CardContent className="mt-0 flex h-auto flex-col p-5">
// 					<InformationSVG />
// 					<UploadRatingForm />
// 				</CardContent>
// 			) : (
// 				<CardContent className="mt-0 items-center justify-center">
// 					Not authorized to assess.
// 				</CardContent>
// 			)}
// 			{applicantStage?.status === "in-progress" && (
// 				<CardFooter className="p-5">
// 					{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
// 					<Assessor assessed_by={applicantStage?.assessed_by as RoleEnumsType[]} />
// 					{/* BELOW IS WHERE THE FORM IS LOCATED SO THAT THE APPLICANT STATUS WILL BE UPDATED */}
// 					{assessedByUsers && checkIfUserIsAllowedToAssessed && (
// 						<SubmitInitialInterviewForm
// 							id={params.id}
// 							evaluatorsId={user?.id as string}
// 							recruitment_stage={currentStageName as string}
// 						/>
// 					)}
// 				</CardFooter>
// 			)}
// 		</Card>
// 		<CommentsAndDocuments
// 			stage="initial_interview"
// 			applicantId={params.id as string}
// 			evaluatorsId={user?.id as string}
// 		/>
// 	</>
// );
