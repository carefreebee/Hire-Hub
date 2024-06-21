import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DEPARTMENT } from "~/constants/constants";
import { TypographySmall } from "../../ui/typography-small";

export default function HrPageHeader() {
	return (
		<header>
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-semibold">Department</TypographySmall>
					</div>
					<div>
						<TypographySmall size={"sm"} variant={"outline"} className="font-medium">
							{DEPARTMENT}
						</TypographySmall>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-medium">Applied as:</TypographySmall>
					</div>
					<div>
						<TypographySmall size={"sm"} variant={"outline"} className="font-medium">
							Teaching Staff
						</TypographySmall>
					</div>
				</div>
			</section>

			<Tabs defaultValue="screening">
				<TabsList>
					<TabsTrigger value="screening">Screening</TabsTrigger>
					<TabsTrigger value="initial-interview">Initial Interview</TabsTrigger>
					<TabsTrigger value="teaching-demo">Teaching Demo</TabsTrigger>
					<TabsTrigger value="psychological-exam">Psychological Exam</TabsTrigger>
					<TabsTrigger value="panel-interview">Panel Interview</TabsTrigger>
					<TabsTrigger value="recommendation-for-hiring">
						Recommendation for Hiring
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</header>
	);
}
