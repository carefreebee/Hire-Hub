import { Input } from "~/components/ui/input";

interface PageOneProps {
	visible: boolean;
	data: any;
}

export default function PageTwo({ visible, data }: PageOneProps) {
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				Elementary
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Name"
						name="elementaryName"
						readOnly
						value={data.rate.education.elementary.name}
					/>
					<Input
						placeholder="Address"
						name="elementaryAddress"
						readOnly
						value={data.rate.education.elementary.address}
					/>
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Dates Attended (From - To)"
						name="datesAttendedElementary"
						readOnly
						value={data.rate.education.elementary.datesAttended}
					/>
					<Input
						placeholder="Year / Course Completed"
						name="yearCourseElementary"
						readOnly
						value={data.rate.education.elementary.yearCourseCompleted}
					/>
				</div>
				<div className="flex flex-col gap-2">
					Secondary
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name"
							name="secondaryName"
							readOnly
							value={data.rate.education.secondary.name}
						/>
						<Input
							placeholder="Address"
							name="secondaryAddress"
							readOnly
							value={data.rate.education.secondary.address}
						/>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Dates Attended (From - To)"
							name="datesAttendedSecondary"
							readOnly
							value={data.rate.education.secondary.datesAttended}
						/>
						<Input
							placeholder="Year / Course Completed"
							name="yearCourseSecondary"
							readOnly
							value={data.rate.education.secondary.yearCourseCompleted}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					College
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name"
							name="collegeName"
							readOnly
							value={data.rate.education.college.name}
						/>
						<Input
							placeholder="Address"
							name="collegeAddress"
							readOnly
							value={data.rate.education.college.address}
						/>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Dates Attended (From - To)"
							name="datesAttendedCollege"
							readOnly
							value={data.rate.education.college.datesAttended}
						/>
						<Input
							placeholder="Year / Course Completed"
							name="yearCourseCollege"
							readOnly
							value={data.rate.education.college.yearCourseCompleted}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					Graduate
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name"
							name="graduateName"
							readOnly
							value={data.rate.education.graduate.name}
						/>
						<Input
							placeholder="Address"
							name="graduateAddress"
							readOnly
							value={data.rate.education.graduate.address}
						/>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Dates Attended (From - To)"
							name="datesAttendedGraduate"
							readOnly
							value={data.rate.education.graduate.datesAttended}
						/>
						<Input
							placeholder="Year / Course Completed"
							name="yearCourseGraduate"
							readOnly
							value={data.rate.education.graduate.yearCourseCompleted}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					Post-Graduate
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name"
							name="postGradName"
							readOnly
							value={data.rate.education.postGraduate.name}
						/>
						<Input
							placeholder="Address"
							name="postGradAddress"
							readOnly
							value={data.rate.education.postGraduate.address}
						/>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Dates Attended (From - To)"
							name="datesAttendedPostGrad"
							readOnly
							value={data.rate.education.postGraduate.datesAttended}
						/>
						<Input
							placeholder="Year / Course Completed"
							name="yearCoursePostGrad"
							readOnly
							value={data.rate.education.postGraduate.yearCourseCompleted}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					Others
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Name"
							name="othersName"
							readOnly
							value={data.rate.education.others.name}
						/>
						<Input
							placeholder="Address"
							name="othersAddress"
							readOnly
							value={data.rate.education.others.address}
						/>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<Input
							placeholder="Dates Attended (From - To)"
							name="datesAttendedOthers"
							readOnly
							value={data.rate.education.others.datesAttended}
						/>
						<Input
							placeholder="Year / Course Completed"
							name="yearCourseOthers"
							readOnly
							value={data.rate.education.others.yearCourseCompleted}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
