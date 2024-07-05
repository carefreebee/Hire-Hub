import { RoleEnumsType } from "~/lib/schema";
import { formattedName } from "~/util/formatted-name";

type AssessorProps = {
	assessed_by: RoleEnumsType[];
};

export default function Assessor({ assessed_by }: AssessorProps) {
	return (
		<div className="flex items-center gap-2">
			<p className="text-sm">Assessed By:</p>
			<p className="rounded-sm bg-[#F9F3E5] px-4 py-1 text-sm">
				{!assessed_by?.length
					? "Wating for HR Head to set the assessor"
					: formattedName(assessed_by[0])}
			</p>
		</div>
	);
}
