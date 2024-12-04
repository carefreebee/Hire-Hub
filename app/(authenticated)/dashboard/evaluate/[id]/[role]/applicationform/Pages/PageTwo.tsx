import { Input } from "~/components/ui/input";

interface PageOneProps {
	step: number;
}

export default function PageTwo({ step }: PageOneProps) {
	return (
		<div
			className={
				step === 2
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				Elementary
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="elementaryName" />
					<Input placeholder="Address" name="elemntaryAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input
						placeholder="Dates Attended (From - To)"
						name="datesAttendedElementary"
					/>
					<Input placeholder="Year / Course Completed" name="yearCourseElementary" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				Secondary
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="secondaryName" />
					<Input placeholder="Address" name="secondaryAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Dates Attended (From - To)" name="datesAttendedSecondary" />
					<Input placeholder="Year / Course Completed" name="yearCourseSecondary" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				College
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="collegeName" />
					<Input placeholder="Address" name="collegeAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Dates Attended (From - To)" name="datesAttendedCollege" />
					<Input placeholder="Year / Course Completed" name="yearCourseCollege" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				Graduate
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="graduateName" />
					<Input placeholder="Address" name="graduateAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Dates Attended (From - To)" name="datesAttendedGraduate" />
					<Input placeholder="Year / Course Completed" name="yearCourseGraduate" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				Post-Graduate
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="postGradName" />
					<Input placeholder="Address" name="postGradAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Dates Attended (From - To)" name="datesAttendedPostGrad" />
					<Input placeholder="Year / Course Completed" name="yearCoursePostGrad" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				Others
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="othersName" />
					<Input placeholder="Address" name="othersAddress" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Dates Attended (From - To)" name="datesAttendedOthers" />
					<Input placeholder="Year / Course Completed" name="yearCourseOthers" />
				</div>
			</div>
		</div>
	);
}
