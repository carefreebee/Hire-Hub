import { formattedName } from "~/util/formatted-name";

type AssessorProps = {
	finalAssessorName: string;
	finalAssessorRole: string;
};

export default function Assessor({ finalAssessorName, finalAssessorRole }: AssessorProps) {
	const assessorInformation = finalAssessorName && finalAssessorRole;

	return (
		<div className="flex items-center gap-2">
			<p className="text-sm">Assessed By:</p>
			<p className="rounded-sm bg-[#F9F3E5] px-4 py-1 text-sm">
				{assessorInformation && (
					<>
						{formattedName(finalAssessorName)} |{" "}
						{formattedName(finalAssessorRole as string)}
					</>
				)}
			</p>
		</div>
	);
}
