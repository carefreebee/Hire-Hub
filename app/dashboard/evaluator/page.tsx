import { Button } from "~/components/ui/button";
import { TypographyMuted } from "~/components/ui/typography-muted";
import { TypographySmall } from "~/components/ui/typography-small";

export default function Evaluator() {
	return (
		<section className="my-14 h-[197px] border-2">
			<header className="flex items-center border-b-2">
				<div className="mr-10 flex-1">
					<TypographySmall size={"lg"} className="h-8">
						Initial Interview Assessment
					</TypographySmall>
				</div>
			</header>
			<div className="flex items-center justify-between p-5">
				<div>
					<TypographyMuted>
						Please attach the complete rating form of the candidate.
					</TypographyMuted>
				</div>
				<div>
					<Button variant={"outline"} className="text-[#407BFF] hover:text-[#407BFF]">
						Submit Form
					</Button>
				</div>
			</div>
		</section>
	);
}
