import {
	NonTeachingStaff,
	SelectedCategoryTeachingStaff,
	TeachingStaff,
} from "~/constant/constant";
import { getApplicantData } from "~/hooks/useApplicantStages";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect } from "~/lib/schema";
import { TypographySmall } from "../../ui/typography-small";
import HrPageHeaderInformation from "./HrPageHeaderInformation";

export default async function HrPageHeader({ id }: { id: string }) {
	const { user } = await validateRequest();
	const { applicant } = await getApplicantData(Number(id));

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
							{applicant?.selected_department || applicant?.selected_office}
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
					<HrPageHeaderInformation
						role={user?.role as string}
						id={id}
						applicant={applicant as ApplicantSelect}
					/>
				</ul>
			</div>
		</header>
	);
}
