"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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


	const filterApplicantsByDate = useCallback(
		(date: Date | undefined) => {
			if (!date) return applicants;

			return applicants.filter((applicant) =>
				Object.values(applicant.stages || {}).some((stage) => {
					if (stage && "date" in stage) {
						const stageDate = new Date(stage.date as string);
						return (
							stageDate.getDate() === date.getDate() &&
							stageDate.getMonth() === date.getMonth() &&
							stageDate.getFullYear() === date.getFullYear()
						);
					}
					return false;
				})
			);
		},
		[applicants]
	);

	const filteredApplicants = useMemo(
		() => filterApplicantsByDate(selectedDate),
		[selectedDate, filterApplicantsByDate]
	);

	const events = useMemo(() => {
		return filteredApplicants
			.flatMap((applicant) =>
				Object.entries(applicant.stages || {}).map(([stageName, stage]) => {
					const stageDate =
						stage && "date" in stage ? new Date(stage.date as string) : null;
					if (stageDate) {
						const isSameDay =
							stageDate.getDate() === selectedDate?.getDate() &&
							stageDate.getMonth() === selectedDate?.getMonth() &&
							stageDate.getFullYear() === selectedDate?.getFullYear();
						if (isSameDay) {
							return { stageName, stageDate, applicant };
						}
					}
					return null;
				})
			)
			.filter(
				(
					event
				): event is { stageName: string; stageDate: Date; applicant: ApplicantSelect } =>
					event !== null
			)
			.sort((a, b) => a!.stageDate!.getTime() - b!.stageDate!.getTime());
	}, [filteredApplicants, selectedDate]);


	return (
		<div className="flex flex-col p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Schedule</h1>
				<p className="text-gray-500">
					{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
				</p>
			</div>

			<div className="grid grid-cols-3 gap-6">
				{/* Main content: Day View, Calendar, and Event Details */}
				<div className="col-span-2 rounded border bg-white p-4 shadow">
					<DayView selectedDate={selectedDate} events={events} />
				</div>

				<div className="col-span-1 flex flex-col space-y-4">
					<CalendarSection selectedDate={selectedDate} onDateChange={setSelectedDate} />
					<EventDetails selectedDate={selectedDate} events={events} />
				</div>
			</div>
		</div>
	);
}

function DayView({
	selectedDate,
	events,
}: {
	selectedDate: Date | undefined;
	events: { stageName: string; stageDate: Date; applicant: ApplicantSelect }[];
}) {
	return (
		<div>
			<p className="text-gray-500 text-sm">
				{selectedDate ? format(selectedDate, "MMMM d") : "Select a date"}
			</p>
			<div className="grid-rows-24 mt-4 grid gap-4">
				{Array.from({ length: 24 }).map((_, index) => {
					const hour = index;
					const eventsAtHour = events.filter(
						(event) => event && event.stageDate.getHours() === hour
					);

					return (
						<div key={index} className="flex items-center justify-between border-b p-2">
							<span className="text-gray-400 text-sm">{`${hour % 12 === 0 ? 12 : hour % 12}:00 ${
								hour < 12 ? "AM" : "PM"
							}`}</span>
							{eventsAtHour.map((event, idx) => {
								const endTime = new Date(
									event.stageDate.getTime() + 60 * 60 * 1000
								);
								return (
									<div
										key={idx}
										className="mb-2 w-full rounded bg-yellow-100 p-2 shadow"
									>
										<h3 className="font-bold">
											{event.stageName.replace("_", " ")} -{" "}
											{event.applicant.last_name}
										</h3>
										<p className="text-gray-500 text-xs">
											{format(event.stageDate, "hh:mm a")} -{" "}
											{format(endTime, "hh:mm a")}
										</p>
									</div>
								);
							})}
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
	events,
}: {
	selectedDate: Date | undefined;
	events: { stageName: string; stageDate: Date; applicant: ApplicantSelect }[];
}) {
	return (
		<div className="max-h-96 overflow-y-auto rounded border bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-bold">Calendar Details</h2>
			<p className="text-sm">
				{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
			</p>
			{events.map((event, idx) => {
				if (!event || !event.stageDate) return null;
				const endTime = new Date(event.stageDate.getTime() + 60 * 60 * 1000);
				return (
					<div key={idx} className="mb-2 w-full rounded bg-yellow-100 p-2 shadow">
						<h3 className="font-bold">
							{event.stageName.replace("_", " ")} - {event.applicant.last_name}
						</h3>
						<p className="text-gray-500 text-xs">
							{format(event.stageDate, "hh:mm a")} - {format(endTime, "hh:mm a")}
						</p>
						<p className="text-xs">
							Applicant: {event.applicant.first_name} {event.applicant.last_name}
						</p>
					</div>
				);
			})}
		</div>
	);
}
