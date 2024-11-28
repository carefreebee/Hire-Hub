"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { AlertDialogAction } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { toast } from "~/components/ui/use-toast";
import {
	UpdatePanelInterview,
	UpdatePsychologicalExam,
	UpdateRecommendationForHiring,
	UpdateTeachingDemo,
	UpdateInitialInterview
} from "~/controller/ApplicantStatusController";
import { formattedDateTime } from "~/lib/date-time";
import { CheckPathname } from "~/util/path";
import { useSelectedAssessedBy, useSelectedDateAndTime, useSelectedMode } from "~/util/zustand";

type ApplicantIDFooterProps = {
	id: number;
};

export default function AddEvaluators({ id }: ApplicantIDFooterProps) {
	const assessedBy = useSelectedAssessedBy((state) => state.assessedBy);
	const selectedAssessedBy = Array.isArray(assessedBy)
		? assessedBy.map((user) => user.id).join(", ")
		: "";
	const { dateTime, setDateTime } = useSelectedDateAndTime((state) => ({
		dateTime: state.dateTime,
		setDateTime: state.setDateTime,
	}));
	const mode = useSelectedMode((state) => state.mode);
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
			} else {
				console.error("dateTime is undefined");
			}
		}
	}

	const pathname = usePathname();
	const lastSegment = CheckPathname(pathname);

	async function handleSubmit() {
		if (!dateTime) {
			toast({
				variant: "destructive",
				title: "Error Updating Applicant Status!",
				description: "Please add date and time to update the status.",
			});
			return;
		}

		const formData = new FormData(formRef.current!);
		if (lastSegment === "initial-interview") {
			await UpdateInitialInterview(formData);
		} else if (lastSegment === "teaching-demo") {
			await UpdateTeachingDemo(formData);
		} else if (lastSegment === "psychological-exam") {
			await UpdatePsychologicalExam(formData);
		} else if (lastSegment === "panel-interview") {
			await UpdatePanelInterview(formData);
		} else if (lastSegment === "recommendation-for-hiring") {
			await UpdateRecommendationForHiring(formData);
		} 

		toast({
			title: "Applicant Status Updated!",
			description: "Applicant status has been updated successfully.",
		});
	}

	return (
		<div className="my-auto flex flex-1">
			<Popover>
				<PopoverTrigger asChild>
					<Button
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
					<div className="mb-3 flex justify-around">
						<Input type="time" onChange={handleTimeInputChange} className="w-auto" />

						<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
							<input type="hidden" name="applicant_id" value={id} readOnly />
							{dateTime && (
								<input
									type="hidden"
									name="selected_date"
									value={dateTime.toISOString()}
									readOnly
								/>
							)}
							<input type="hidden" name="selected_mode" value={mode} readOnly />
							<input
								type="hidden"
								name="assessed_by"
								value={selectedAssessedBy}
								readOnly
							/>
							<ConfirmationModal
								mainButton={<Button type="submit">Apply</Button>}
								descriptionButtonLabel="Are you sure you want to update Applicant Status"
								cancelButtonLabel="No, cancel"
							>
								<AlertDialogAction className="w-full" onClick={handleSubmit}>
									Yes, submit
								</AlertDialogAction>
							</ConfirmationModal>
						</form>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
