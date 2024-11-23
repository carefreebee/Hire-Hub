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
	// Flatten stages with their date into a sortable list
	const events = filteredApplicants
		.flatMap((applicant) =>
			Object.entries(applicant.stages || {}).map(([stageName, stage]) => {
				const stageDate = stage && "date" in stage ? new Date(stage.date as string) : null;
				if (stageDate) {
					// Check if the event's date matches the selected date
					const isSameDay =
						stageDate.getDate() === selectedDate?.getDate() &&
						stageDate.getMonth() === selectedDate?.getMonth() &&
						stageDate.getFullYear() === selectedDate?.getFullYear();
					if (isSameDay) {
						// Return the event if it matches the selected date
						return {
							stageName,
							stageDate,
							applicant,
						};
					}
				}
				return null;
			})
		)
		.filter((event) => event !== null); // Remove any null values

	// Sort events by their stage date
	const sortedEvents = events.sort((a, b) => a.stageDate!.getTime() - b.stageDate!.getTime());

	return (
		<div>
			<p className="text-gray-500 text-sm">
				{selectedDate ? format(selectedDate, "MMMM d") : "Select a date"}
			</p>
			<div className="grid-rows-24 mt-4 grid gap-4">
				{Array.from({ length: 24 }).map((_, index) => {
					const hour = index;
					// Filter events for this hour
					const eventsAtHour = sortedEvents.filter((event) => {
						const stageTime = event.stageDate.getHours();
						return stageTime === hour;
					});

					return (
						<div key={index} className="flex items-center justify-between border-b p-2">
							<span className="text-gray-400 text-sm">{`${hour % 12 === 0 ? 12 : hour % 12}:00 ${
								hour < 12 ? "AM" : "PM"
							}`}</span>
							{eventsAtHour.map((event, idx) => {
								const endTime = new Date(
									event.stageDate.getTime() + 60 * 60 * 1000
								); // 1 hour duration

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
	filteredApplicants,
}: {
	selectedDate: Date | undefined;
	filteredApplicants: ApplicantSelect[];
}) {
	// Flatten stages with their date into a sortable list
	const events = filteredApplicants
		.flatMap((applicant) =>
			Object.entries(applicant.stages || {}).map(([stageName, stage]) => {
				const stageDate = stage && "date" in stage ? new Date(stage.date as string) : null;
				if (stageDate) {
					// Check if the event's date matches the selected date
					const isSameDay =
						stageDate.getDate() === selectedDate?.getDate() &&
						stageDate.getMonth() === selectedDate?.getMonth() &&
						stageDate.getFullYear() === selectedDate?.getFullYear();
					if (isSameDay) {
						// Return the event if it matches the selected date
						return {
							stageName,
							stageDate,
							applicant,
						};
					}
				}
				return null;
			})
		)
		.filter((event) => event !== null); // Remove any null values

	// Sort events by their stage date
	const sortedEvents = events.sort((a, b) => a.stageDate!.getTime() - b.stageDate!.getTime());

	return (
		<div className="max-h-96 overflow-y-auto rounded border bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-bold">Calendar Details</h2>
			<p className="text-sm">
				{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
			</p>
			{sortedEvents.map((event, idx) => {
				if (!event.stageDate) return null; // Skip if no valid date
				const endTime = new Date(event.stageDate.getTime() + 60 * 60 * 1000); // 1 hour duration

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