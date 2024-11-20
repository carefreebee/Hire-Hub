"use client";

import { useState, useEffect } from "react";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { getAllApplicantForm } from "~/controller/ApplicantFormController";
import { ApplicantSelect } from "~/lib/schema";

export default function SchedulePage() {
	const [applicants, setApplicants] = useState<ApplicantSelect[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

	useEffect(() => {
		const fetchApplicants = async () => {
			const applicantsData = await getAllApplicantForm();
			setApplicants(applicantsData);
		};
		fetchApplicants();
	}, []);

	const filteredApplicants = selectedDate
		? applicants.filter(
				(applicant) =>
					applicant.stages &&
					Object.values(applicant.stages).some((stage) => {
						if (stage && "date" in stage) {
							const stageDate = new Date(stage.date as string);
							return (
								stageDate.getDate() === selectedDate.getDate() &&
								stageDate.getMonth() === selectedDate.getMonth() &&
								stageDate.getFullYear() === selectedDate.getFullYear()
							);
						}
						return false;
					})
			)
		: applicants;

	return (
		<div className="flex flex-col p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Schedule</h1>
				<p className="text-gray-500">
					{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
				</p>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 rounded border bg-white p-4 shadow">
					<WeekView selectedDate={selectedDate} filteredApplicants={filteredApplicants} />
				</div>

				<div className="col-span-1 flex flex-col space-y-4">
					<CalendarSection selectedDate={selectedDate} onDateChange={setSelectedDate} />
					<EventDetails
						selectedDate={selectedDate}
						filteredApplicants={filteredApplicants}
					/>
				</div>
			</div>
		</div>
	);
}

function WeekView({
	selectedDate,
	filteredApplicants,
}: {
	selectedDate: Date | undefined;
	filteredApplicants: ApplicantSelect[];
}) {
	return (
		<div>
			<p className="text-gray-500 text-sm">
				{selectedDate ? format(selectedDate, "MMMM d") : "this week"}
			</p>
			<div className="grid-rows-24 mt-4 grid gap-4">
				{Array.from({ length: 24 }).map((_, index) => {
					const hour = index;
					const applicantsAtHour = filteredApplicants.filter(
						(applicant) =>
							applicant.stages &&
							Object.values(applicant.stages).some((stage) => {
								if (stage && "date" in stage) {
									const stageDate = new Date(stage.date as string);
									return (
										stageDate.getHours() === hour &&
										stageDate.getDate() === selectedDate?.getDate() &&
										stageDate.getMonth() === selectedDate?.getMonth() &&
										stageDate.getFullYear() === selectedDate?.getFullYear()
									);
								}
								return false;
							})
					);
					return (
						<div key={index} className="flex items-center justify-between border-b p-2">
							<span className="text-gray-400 text-sm">{`${hour % 12 === 0 ? 12 : hour % 12}:00 ${
								hour < 12 ? "AM" : "PM"
							}`}</span>
							{applicantsAtHour.map((applicant, idx) => (
								<div
									key={idx}
									className="mb-2 w-full rounded bg-yellow-100 p-2 shadow"
								>
									<h3 className="font-bold">
										{applicant.stages ? Object.keys(applicant.stages)[0] : ""} -{" "}
										{applicant.last_name}
									</h3>
									<p className="text-gray-500 text-xs">{`${hour % 12 === 0 ? 12 : hour % 12}:00 - ${
										(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12
									}:00`}</p>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function CalendarSection({
	selectedDate,
	onDateChange,
}: {
	selectedDate: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
}) {
	return (
		<div className="rounded border bg-white p-4 shadow">
			<Calendar
				selected={selectedDate}
				onSelect={(date) => onDateChange(date ?? undefined)}
				mode="single"
				className="w-full"
			/>
		</div>
	);
}

function EventDetails({
	selectedDate,
	filteredApplicants,
}: {
	selectedDate: Date | undefined;
	filteredApplicants: ApplicantSelect[];
}) {
	return (
		<div className="max-h-96 overflow-y-auto rounded border bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-bold">Calendar Details</h2>
			<div>
				<p className="text-sm">
					{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
				</p>
				{filteredApplicants.map((applicant, idx) => (
					<div key={idx}>
						{Object.entries(applicant.stages || {}).map(([stageName, stage]) => {
							if (stage && "date" in stage) {
								const stageDate = new Date(stage.date as string);
								return (
									<div
										key={stageName}
										className="mb-2 w-full rounded bg-yellow-100 p-2 shadow"
									>
										<h3 className="font-bold">
											{stageName.replace("_", " ")} - {applicant.last_name}
										</h3>
										<p className="text-gray-500 text-xs">{`${
											stageDate.getHours() % 12 === 0
												? 12
												: stageDate.getHours() % 12
										}:00 ${stageDate.getHours() < 12 ? "AM" : "PM"}`}</p>
										<p className="text-xs">
											Applicant: {applicant.first_name} {applicant.last_name}
										</p>
									</div>
								);
							}
							return null;
						})}
					</div>
				))}
			</div>
		</div>
	);
}
