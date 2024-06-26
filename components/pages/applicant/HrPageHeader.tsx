import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { TypographySmall } from "../../ui/typography-small";
import { getApplicantData } from "~/hooks/useApplicantStages";

export default async function HrPageHeader({ id }: { id: string }) {
	const { applicant, stages } = await getApplicantData(Number(id));

	return (
		<header>
			<section className="flex">
				<div className="my-5 flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-semibold">Department</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.selected_department}
						</TypographySmall>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div>
						<TypographySmall className="font-medium">Applied as:</TypographySmall>
					</div>
					<div>
						<TypographySmall
							size={"sm"}
							variant={"outline"}
							className="font-medium shadow-md"
						>
							{applicant?.positionType === SelectedCategoryTeachingStaff
								? TeachingStaff
								: NonTeachingStaff}
						</TypographySmall>
					</div>
				</div>
			</section>

			<div>
				<ul className="flex justify-between rounded-lg border shadow-md">
					{stages.map((item, index) => (
						<li
							key={index}
							className={`${item.status === "in-progress" ? "rounded-lg bg-[#FFCB78]" : "bg-transparent"} px-5 py-2 text-sm font-medium`}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
