import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { formattedNameAndRole } from "~/util/formatted-name";
import { CardContent } from "./CardComponent";

export function Waiting() {
	return (
		<CardContent className="mt-0 flex-col items-center justify-center gap-2">
			<p className="text-xl font-medium">Waiting...</p>
			<TypographySmall>Wating for Recruitment Officer to set the assessor.</TypographySmall>
		</CardContent>
	);
}

export function FinalStatus({ mode }: { mode: string }) {
	return (
		<Button variant={"outline"} disabled className="h-auto w-32 py-1">
			{formattedNameAndRole(mode as string, "_")}
		</Button>
	);
}

type AssessorInfoProps = {
	finalAssessorName: string;
	finalAssessorRole: string;
};

export function AssessorInfo({ finalAssessorName, finalAssessorRole }: AssessorInfoProps) {
	const assessorInformation = finalAssessorName && finalAssessorRole;

	return (
		<div className="flex items-center gap-2">
			<p className="text-sm">Assessed By:</p>
			<p className="rounded-sm bg-[#F9F3E5] px-4 py-1 text-sm">
				{assessorInformation ? (
					<>
						{formattedNameAndRole(finalAssessorName, "_")} |{" "}
						{formattedNameAndRole(finalAssessorRole as string, "_")}
					</>
				) : (
					<>Waiting...</>
				)}
			</p>
		</div>
	);
}
