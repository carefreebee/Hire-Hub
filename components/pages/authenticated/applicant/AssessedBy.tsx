"use client";

import { TypographySmall } from "~/components/ui/typography-small";
import { User } from "~/lib/schema";
import { AssessedByUserDetails } from "~/types/types";
import { formattedName } from "~/util/formatted-name";
import { useSelectedAssessedBy } from "~/util/zustand";

type AssessedByProps = {
	isThereAssessors: string[];
	assessors: AssessedByUserDetails[];
};

export default function AssessedBy({ isThereAssessors, assessors }: AssessedByProps) {
	const { assessedBy: selectedAssessedBy } = useSelectedAssessedBy((state) => ({
		assessedBy: state.assessedBy as Partial<User>[],
	}));

	return (
		<>
			<TypographySmall size={"md"}>Assessed by:</TypographySmall>
			<TypographySmall size={"md"} className="flex-col text-xs">
				{isThereAssessors && isThereAssessors.length > 0 ? (
					<>
						{assessors.map((user) => (
							<p key={user.id} className="mr-auto">
								{formattedName(user.name as string)} |{" "}
								{formattedName(user.role as string)}
							</p>
						))}
					</>
				) : selectedAssessedBy.length > 0 ? (
					<>
						{selectedAssessedBy.map((user) => (
							<p key={user.id} className="mr-auto">
								{formattedName(user.name as string)} |{" "}
								{formattedName(user.role as string)}
							</p>
						))}
					</>
				) : (
					<p className="mr-auto">Needs to be assess</p>
				)}
			</TypographySmall>
		</>
	);
}
