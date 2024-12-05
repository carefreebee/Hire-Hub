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

export function ScreeningAndInitial({ status }: { status: string }) {
	return (
		<Button variant={"outline"} disabled className="h-auto w-32 py-1">
			{formattedNameAndRole(status as string, "_")}
		</Button>
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
	finalAssessorName: string | undefined;
	finalAssessorRole: string | undefined;
};

export function AssessorInfo({ finalAssessorName, finalAssessorRole }: AssessorInfoProps) {
	const assessorInformation = finalAssessorName && finalAssessorRole;

	return (
		<div className="flex flex-col items-start gap-2">
			<div className="text-gray-500 bg-gray-50 text-xs">
				<span className="italic">
					<span className="font-semibold">Note:</span> The first selected evaluator is the
					decision maker.
				</span>
			</div>

			<div className="flex items-center gap-2">
				<p className="text-sm font-semibold">Assessed By:</p>
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
		</div>
	);
}
