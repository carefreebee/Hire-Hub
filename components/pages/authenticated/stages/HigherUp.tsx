import { Button } from "~/components/ui/button";
import { User } from "~/lib/schema";
import { AssessedByUserDetails } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { MatchingUser } from "~/util/matching-users";
import AddEvaluators from "../applicant/Card/AddEvaluators";
import AssessedBy from "../applicant/Card/AssessedBy";
import { CardFooter } from "../applicant/Card/CardComponent";
import CheckboxAssessedBy from "../applicant/Card/CheckboxAssessedBy";
import { AssessorInfo } from "../applicant/Card/StatusDisplayComponents";
import SelectMode from "../applicant/initial-interview/SelectMode";

type DisplayModeProps = {
	status: string | undefined;
	mode: string | undefined;
};

export function DisplayMode({ status, mode }: DisplayModeProps) {
	const inProgress = status === "in-progress";
	const isPassed = status === "passed";
	const isFailed = status === "failed";

	return (
		<>
			{inProgress ? (
				<SelectMode />
			) : (
				(isPassed || isFailed) && (
					<Button variant={"outline"} disabled className="h-auto w-32 py-1">
						{formattedNameAndRole(mode as string, "_")}
					</Button>
				)
			)}
		</>
	);
}

export async function DisplayAssessedBy({ assessedById }: { assessedById: string[] }) {
	const assessors = await MatchingUser(assessedById);
	return (
		<AssessedBy
			isThereAssessors={assessedById}
			assessors={assessors as AssessedByUserDetails[]}
		/>
	);
}

type DisplayFooterProps = {
	status: string;
	applicantId: number;
	users: Partial<User>[];
	assessorsName: string | undefined;
	assessorsRole: string | undefined;
};

export function DisplayFooter({
	status,
	applicantId,
	users,
	assessorsName,
	assessorsRole,
}: DisplayFooterProps) {
	const inProgress = status === "in-progress";

	return (
		<>
			{inProgress ? (
				<CardFooter>
					<AddEvaluators id={applicantId as number} />
					<div className="flex-1">
						<CheckboxAssessedBy assessed_by={users} />
					</div>
				</CardFooter>
			) : (
				<CardFooter className="p-5">
					<AssessorInfo
						finalAssessorName={assessorsName}
						finalAssessorRole={assessorsRole}
					/>
				</CardFooter>
			)}
		</>
	);
}
