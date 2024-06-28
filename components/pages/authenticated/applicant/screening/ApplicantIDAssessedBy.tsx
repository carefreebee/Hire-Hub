import { TypographySmall } from "~/components/ui/typography-small";

type ApplicantIDAssessedByProps = {
	status: string;
	assessedBy: string;
};

export default function ApplicantIDAssessedBy({ status, assessedBy }: ApplicantIDAssessedByProps) {
	return (
		<TypographySmall size={"md"} className="px-0 text-xs">
			{status === "passed" ? assessedBy : "Please update the status"}
		</TypographySmall>
	);
}
