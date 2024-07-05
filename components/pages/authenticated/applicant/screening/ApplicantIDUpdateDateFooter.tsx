"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { handleHrHeadUdpatesApplicantStatusScreeningDate } from "~/controller/HrHeadUpdatesApplicantStatusController";
import { formattedDateTime } from "~/lib/date-time";
import { useSelectedDateAndTime } from "~/util/zustand";

type ApplicantIDFooterProps = {
	id: number;
	date: Date;
};

export default function ApplicantIDUpdateDateFooter({ id, date }: ApplicantIDFooterProps) {
	const { dateTime, setDateTime } = useSelectedDateAndTime((state) => ({
		dateTime: state.dateTime,
		setDateTime: state.setDateTime,
	}));
	const formRef = useRef<HTMLFormElement>(null);

	function handleTimeInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const timeParts = event.target.value.split(":");
		if (timeParts.length === 2) {
			const hours = parseInt(timeParts[0], 10);
			const minutes = parseInt(timeParts[1], 10);

			if (dateTime !== undefined) {
				const newDateTime = new Date(dateTime);
				newDateTime.setHours(hours);
				newDateTime.setMinutes(minutes);
				setDateTime(newDateTime);
			}
		}
	}

	async function handleSubmit() {
		const formData = new FormData(formRef.current!);
		try {
			await handleHrHeadUdpatesApplicantStatusScreeningDate(formData);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<>
			<div className="my-auto flex">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							disabled={!!date}
							variant={"ghost"}
							className="w-auto justify-start text-left text-[#0F91D2]"
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{dateTime ? formattedDateTime(dateTime) : <span>+Add Schedule</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={dateTime || undefined}
							onSelect={setDateTime}
							initialFocus
						/>
						<Input type="time" onChange={handleTimeInputChange} className="mx-auto" />
					</PopoverContent>
				</Popover>
			</div>
			<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="text-[#0F91D2]">
				<input type="hidden" name="applicant_id" value={id} readOnly />
				{dateTime && (
					<input
						type="hidden"
						name="selected_date"
						value={dateTime.toISOString()}
						readOnly
					/>
				)}
				<ConfirmationModal
					mainButton={
						<Button type="submit" variant={"ghost"} className="text-[#0F91D2]">
							Update
						</Button>
					}
					descriptionButtonLabel="Are you sure you want to update Applicant Status"
					cancelButtonLabel="No, cancel"
				>
					<AlertDialogAction className="w-full" onClick={handleSubmit}>
						Yes, submit
					</AlertDialogAction>
				</ConfirmationModal>
			</form>
		</>
	);
}
