import Previous from "~/components/pages/Previous";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
	FullTimeType,
	NonTeachingStaff,
	PartTimeType,
	SelectedCategoryTeachingStaff,
	SelectedPartTimeType,
	TeachingStaff,
} from "~/constant/constant";
import { getJobRequestByID } from "~/controller/JobRequestController";

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const jobRequestByID = await getJobRequestByID(Number(params.id));

	return (
		<section className="bg-slate-200/30">
			<div className="flex flex-col py-10">
				<Previous href="/dashboard/request" text="View all Request" />
				<section className="py-10">
					<div className="mx-auto flex w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-10 shadow-md">
						<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
							Request Details
						</h4>
						<div className="mx-auto w-[564px]">
							<LabelTag label="Requested Position" />
							<Input
								value={jobRequestByID?.requested_position}
								readOnly
								className="border-2"
							/>
						</div>

						{/* <div className="mx-auto w-[564px]">
						<LabelTag label="Request Date" />
						<Input
							value={formattedDate(jobRequestByID?.requested_date!)}
							readOnly
							className="border-2"
						/>
					</div> */}

						<div className="mx-auto w-[564px]">
							<LabelTag label="Request Date" />
							<Input
								value={
									jobRequestByID?.requested_category ===
									SelectedCategoryTeachingStaff
										? TeachingStaff
										: NonTeachingStaff
								}
								readOnly
								className="border-2"
							/>
						</div>

						<div className="mx-auto w-[564px]">
							<LabelTag label="Type" />
							<Input
								value={
									jobRequestByID?.requested_type === SelectedPartTimeType
										? PartTimeType
										: FullTimeType
								}
								readOnly
								className="border-2"
							/>
						</div>

						<div className="mx-auto w-[564px]">
							<LabelTag
								label={
									jobRequestByID?.requested_category ===
									SelectedCategoryTeachingStaff
										? "Department"
										: "Office"
								}
							/>
							<Input
								value={
									jobRequestByID?.requested_department ||
									jobRequestByID?.requested_office!
								}
								readOnly
								className="border-2"
							/>
						</div>

						<div className="mx-auto grid w-[564px] gap-1.5">
							<LabelTag label="Description" />
							<Textarea
								value={jobRequestByID?.requested_description}
								readOnly
								className="border-2"
							/>
						</div>

						<div className="mx-auto grid w-[564px] gap-1.5">
							<LabelTag label="Qualification" />
							<Textarea
								value={jobRequestByID?.requested_qualification}
								readOnly
								className="border-2"
							/>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
}
