import InformationSVG from "~/components/ui/information";
import { TypographySmall } from "~/components/ui/typography-small";
import { CardContent, CardFooter } from "../applicant/Card/CardComponent";
import { AssessorInfo } from "../applicant/Card/StatusDisplayComponents";
import UploadRatingForm from "../applicant/Card/UploadRatingForm";
import { StageStatus, UploadSuccess } from "./Messages";
import SubmitStagesForm from "../applicant/Card/SubmitStagesForm";

type AssessedByUser = boolean;
type CheckIfUserIsAllowedToAssess = boolean;
type HasUserPostedRating = boolean;

type DeptOrOfficeProps = {
	assessorLength: number | undefined;
	assessedByUsers: AssessedByUser;
	hasUserPostedRating: HasUserPostedRating;
	checkIfUserIsAllowedToAssess?: CheckIfUserIsAllowedToAssess;
	status: string | undefined;
	stageName: string | undefined;
};

export function DeptOrOfficeComponent({
	assessorLength,
	assessedByUsers,
	hasUserPostedRating,
	checkIfUserIsAllowedToAssess,
	status,
	stageName,
}: DeptOrOfficeProps) {
	const inProgress = status === "in-progress";
	const showAssessmentForm =
		assessedByUsers &&
		(!checkIfUserIsAllowedToAssess || checkIfUserIsAllowedToAssess) &&
		!hasUserPostedRating;

	return (
		<>
			{inProgress && !assessorLength ? (
				<CardContent className="mt-0 flex-col items-center justify-center gap-2">
					<p className="text-xl font-medium">Waiting...</p>
					<TypographySmall>
						Waiting for Recruitment Officer to set the assessor.
					</TypographySmall>
				</CardContent>
			) : showAssessmentForm && stageName === "Psychological Exam" ? (
				<CardContent className="mt-0 flex h-auto flex-col p-5">
					<InformationSVG />
					<UploadRatingForm />
				</CardContent>
			) : hasUserPostedRating ? (
				<UploadSuccess />
			) : (
				<StageStatus status={status ?? ""} />
			)}
		</>
	);
}

type DeptOrOfficeFooterProps = {
	status: string | undefined;
	assessorsName: string | undefined;
	assessorsRole: string | undefined;
	assessedByUsers: AssessedByUser;
	checkIfUserIsAllowedToAssess?: CheckIfUserIsAllowedToAssess;
	hasUserPostedRating: HasUserPostedRating;
	applicantId: string;
	userId: string;
	currentStageName: string;
};

export function DeptOrOfficeFooter({
	status,
	assessorsName,
	assessorsRole,
	assessedByUsers,
	checkIfUserIsAllowedToAssess,
	hasUserPostedRating,
	applicantId,
	userId,
	currentStageName,
}: DeptOrOfficeFooterProps) {
	const inProgress = status === "in-progress";
	const showSubmitButton =
		assessedByUsers &&
		(!checkIfUserIsAllowedToAssess || checkIfUserIsAllowedToAssess) &&
		!hasUserPostedRating;
	const showSubmitForm = currentStageName === "Psychological Exam";
	return (
		<>
			{inProgress && (
				<CardFooter className="p-5">
					{/* SHOWS WHAT DEPARTMENT/OFFICE TYPE THE ASSESSOR IS */}
					<AssessorInfo
						finalAssessorName={assessorsName}
						finalAssessorRole={assessorsRole}
					/>
					{/* BELOW IS WHERE THE FORM IS LOCATED SO THAT THE APPLICANT STATUS WILL BE UPDATED */}
					{showSubmitForm && showSubmitButton && (
						<SubmitStagesForm
							id={applicantId}
							evaluatorsId={userId as string}
							recruitment_stage={currentStageName as string}
						/>
					)}
				</CardFooter>
			)}
		</>
	);
}
