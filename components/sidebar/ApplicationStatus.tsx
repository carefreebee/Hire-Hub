import { Button } from "../ui/button";
import { TypographySmall } from "../ui/typography-small";

export default function ApplicationStatus() {
	return (
		<>
			<ul className="flex flex-col gap-8">
				<div>
					<li>Initial Interview</li>
					<Button variant={"secondary"} className="h-7">
						<TypographySmall>PASSED</TypographySmall>
					</Button>
				</div>
				<div>
					<li>Teaching Demo</li>
					<Button variant={"secondary"} className="h-7">
						<TypographySmall>PASSED</TypographySmall>
					</Button>
				</div>
				<div>
					<li>Psychological Exam</li>
					<Button variant={"secondary"} className="h-7">
						<TypographySmall>IN PROGRESS</TypographySmall>
					</Button>
				</div>
				<div>
					<li>Panel Interview</li>
					<Button variant={"secondary"} className="h-7">
						<TypographySmall>IN PROGRESS</TypographySmall>
					</Button>
				</div>
				<div>
					<li>Recommendation for Hiring</li>
					<Button variant={"secondary"} className="h-7">
						<TypographySmall>IN PROGRESS</TypographySmall>
					</Button>
				</div>
			</ul>
		</>
	);
}
