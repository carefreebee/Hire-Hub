import { formattedName } from "~/util/formatted-name";

type AssessedByProps = {
	nameSubmitter: string;
	finalSubmitter: string;
};

export default function AssessedBy({ nameSubmitter, finalSubmitter }: AssessedByProps) {
	return (
		<div className="flex items-center gap-2">
			<p className="text-sm">Assessed By:</p>
			{finalSubmitter ? (
				<p className="rounded-sm bg-[#F9F3E5] px-4 py-1 text-sm">
					{formattedName(nameSubmitter as string)} |{" "}
					{formattedName(finalSubmitter as string)}
				</p>
			) : (
				<p className="rounded-sm bg-[#F9F3E5] px-4 py-1 text-sm">
					Wating for Recruitment Office to set the assessor
				</p>
			)}
		</div>
	);
}
