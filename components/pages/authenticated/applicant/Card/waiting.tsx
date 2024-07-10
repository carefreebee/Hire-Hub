import { TypographySmall } from "~/components/ui/typography-small";
import { CardContent } from "../ApplicantIDCard";

export default function Waiting() {
	return (
		<CardContent className="mt-0 flex-col items-center justify-center gap-2">
			<p className="text-xl font-medium">Waiting...!</p>
			<TypographySmall>Wating for Recruitment Officer to set the assessor.</TypographySmall>
		</CardContent>
	);
}
