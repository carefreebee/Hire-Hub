import dynamic from "next/dynamic";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
} from "~/components/pages/authenticated/applicant/Card/CardComponent";
import DownloadForm from "~/components/pages/authenticated/applicant/Card/DownloadForm";
import SubmitStagesForm from "~/components/pages/authenticated/applicant/Card/SubmitStagesForm";
import UpdateDate from "~/components/pages/authenticated/applicant/Card/UdpateDate";
import UpdateStatus from "~/components/pages/authenticated/applicant/Card/UdpateStatus";
import UploadRatingForm from "~/components/pages/authenticated/applicant/Card/UploadRatingForm";
import CommentsAndDocuments from "~/components/pages/authenticated/applicant/CardFooter/CommentsAndDocuments";
import { Button } from "~/components/ui/button";
import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { getAllRatingFormsFilesById, getRatingFormsById } from "~/Controller/RatingFormsController";
import { validateRequest } from "~/lib/auth";
import { ResumeProps } from "~/types/types";
import { DisplayAssessedBy } from "~/util/display-assessed-by";
import { formattedName } from "~/util/formatted-name";
import { GetCurrentStage } from "~/util/get-current-stage";

const DisplayDateNoSSR = dynamic(
	() => import("~/components/pages/authenticated/applicant/Card/DisplayDate"),
	{
		ssr: false,
	}
);

const currentStageName = "Initial Interview";

export default async function InitialInterviewPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	// GETTING THE APPLICANT BY ID
	// GETTING THE CURRENT STAGE OF THE APPLICANT eg. initial_interview, screening, etc.
	const { applicant, applicantStage } = await GetCurrentStage(
		Number(params.id),
		"initial_interview"
	);
	const { resume_name, resume_url, letter_name, letter_url } = applicant?.resume as ResumeProps;

	// USAGE FOR THE + ADD EVALUATOR AND GETTING THE FINAL ASSESSOR
	const users = await DisplayAssessedBy();

	const isRecruitmentOfficer = user?.role === "recruitment_officer";

	const ratingForm = await getAllRatingFormsFilesById(Number(params.id));
	const isRatingFormSubmitted = ratingForm?.length > 0;

	const documentIds = (applicantStage?.rating_forms_id as number[]) || [];
	const documentPromises = documentIds.map((id) => getRatingFormsById(id));
	const documentResults = await Promise.all(documentPromises);
	const document = documentResults.flat();

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
								<DisplayDateNoSSR date={applicantStage?.date as Date} />
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
								<UpdateDate
									id={applicant?.id as number}
									date={applicantStage?.date as Date}
								/>
							) : applicantStage?.status !== "passed" && isRecruitmentOfficer ? (
								<UpdateStatus
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
							<SubmitStagesForm
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
				resume_name={resume_name}
				resume_url={resume_url}
				letter_name={letter_name}
				letter_url={letter_url}
				document={document}
				users={users}
			/>
		</>
	);
}
