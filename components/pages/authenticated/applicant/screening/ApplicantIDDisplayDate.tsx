"use client";

import { TypographySmall } from "~/components/ui/typography-small";
import { formattedDateTime } from "~/lib/date-time";

export default function ApplicantIDDisplayDate({ date }: { date: Date }) {
	console.log("Dateeeee", date);
	return (
		<TypographySmall size={"md"} className="pt-0 text-xs">
			{date === null ? "No date set" : formattedDateTime(date)}
		</TypographySmall>
	);
}
