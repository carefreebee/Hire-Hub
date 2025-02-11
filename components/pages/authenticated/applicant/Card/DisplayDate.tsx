import { TypographySmall } from "~/components/ui/typography-small";
import { formattedDateTime } from "~/lib/date-time";

export default function DisplayDate({ date }: { date: Date }) {
	return (
		<TypographySmall size={"md"} className="pt-0 text-xs">
			{date ? formattedDateTime(date) : "No date set"}
		</TypographySmall>
	);
}
