import { Key } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageSeven({ visible, data }: PageOneProps) {
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				General Information
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Have you applied in CIT-U before?"
						name="genInfoYesOrNo"
						readOnly
						value={data.rate.generalInfo.appliedBefore}
					/>
					<Input
						placeholder="When?"
						name="genInfoWhen"
						readOnly
						value={data.rate.generalInfo.when}
					/>
					<Input
						placeholder="What college/department?"
						name="genInfoCollege"
						readOnly
						value={data.rate.generalInfo.collegeDepartment}
					/>
				</div>
				{data.rate.generalInfo.exams.map(
					(
						exam: {
							id: Key | null | undefined;
							exam: string | number | readonly string[] | undefined;
							date: string | number | readonly string[] | undefined;
							rating: string | number | readonly string[] | undefined;
						},
						index: number
					) => (
						<div
							key={exam.id}
							className="flex w-full items-center justify-center gap-2"
						>
							<Input
								placeholder="Kinds of Exam Taken"
								name={`genInfoExam${index + 1}`}
								readOnly
								value={exam.exam}
							/>
							<Input
								placeholder="Date Taken"
								name={`genInfoDate${index + 1}`}
								readOnly
								value={exam.date}
							/>
							<Input
								placeholder="Ratings"
								name={`genInfoRating${index + 1}`}
								readOnly
								value={exam.rating}
							/>
						</div>
					)
				)}
			</div>
			<div className="flex flex-col gap-2">
				Achievements
				<Textarea
					placeholder="Achievements (e.g. honors/titations/awards, etc."
					name="genInfoAchievements"
					readOnly
					value={data.rate.generalInfo.achievements}
				/>
			</div>

			<div className="flex flex-col gap-2">
				Person to be notified in case of emergency
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Name"
						name="genInfoEmergencyName"
						readOnly
						value={data.rate.generalInfo.emergencyContact.name}
					/>
					<Input
						placeholder="Relation"
						name="genInfoRelation"
						readOnly
						value={data.rate.generalInfo.emergencyContact.relation}
					/>
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Address"
						name="genInfoAddress"
						readOnly
						value={data.rate.generalInfo.emergencyContact.address}
					/>
					<Input
						placeholder="Contact No."
						name="genInfoContact"
						readOnly
						value={data.rate.generalInfo.emergencyContact.contactNumber}
					/>
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Textarea
						placeholder="Please state reason/s why you want to work in CIT"
						name="genInfoReasons"
						readOnly
						value={data.rate.generalInfo.reasons}
					/>
				</div>
			</div>
		</div>
	);
}
