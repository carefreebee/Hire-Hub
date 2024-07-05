import { TypographySmall } from "~/components/ui/typography-small";
import { RoleEnumsType } from "~/lib/schema";
import { formattedName } from "~/util/formatted-name";

type AssessedByProps = {
	status: string;
	assessedBy: RoleEnumsType[];
};

export default function AssessedBy({ status, assessedBy }: AssessedByProps) {
	return (
		<>
			<TypographySmall size={"md"}>Assessed by:</TypographySmall>
			<TypographySmall size={"md"} className="text-xs">
				{status === "passed" || status === "in-progress" ? (
					<div className="flex flex-col">
						{assessedBy?.map((role) => <p key={role}>{formattedName(role)}</p>)}
					</div>
				) : (
					"Please add an evaluator."
				)}
			</TypographySmall>
		</>
	);
}
