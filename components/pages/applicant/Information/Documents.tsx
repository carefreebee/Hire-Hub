import { useState } from "react";
import { Card } from "~/components/ui/card";
import { ApplicantFormType } from "~/types/types";

interface DocumentProps {
	applicant: ApplicantFormType;
}

export default function DocumentInfo({ applicant }: DocumentProps) {
	const resume = applicant.resume;

	const handleClickResume = async () => {
		if (resume?.resume_url) {
			const response = await fetch(resume.resume_url);
			const blob = await response.blob();
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute("download", resume.resume_name || "document.pdf");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			alert("Resume URL is not available.");
		}
	};

	const handleClickLetter = async () => {
		if (resume?.letter_url) {
			const response = await fetch(resume.letter_url);
			const blob = await response.blob();
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute("download", resume.letter_name || "document.pdf");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			alert("Resume URL is not available.");
		}
	};

	const handleViewResume = () => {
		if (resume?.resume_url) {
			window.open(resume.resume_url, "_blank");
		} else {
			alert("Resume URL is not available.");
		}
	};

	const handleViewLetter = () => {
		if (resume?.letter_url) {
			window.open(resume.letter_url, "_blank");
		} else {
			alert("Application Letter URL is not available.");
		}
	};

	return (
		<div className="grid w-full grid-cols-2 gap-5">
			<Card className="grid grid-cols-4 p-5 text-xs">
				<h1 className="col-span-3 flex place-items-center">{resume!.resume_name}</h1>
				<div className="col-span-1 flex justify-end">
					<div onClick={handleViewResume} className="cursor-pointer">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21.8891 9.8531C23.0487 11.0732 23.0487 12.9268 21.8891 14.1469C19.9333 16.2047 16.5743 19 12.7588 19C8.94327 19 5.58428 16.2047 3.6285 14.1469C2.46889 12.9268 2.46889 11.0732 3.62849 9.8531C5.58428 7.79533 8.94327 5 12.7588 5C16.5743 5 19.9333 7.79533 21.8891 9.8531Z"
								stroke="#16151C"
								stroke-width="1.5"
							/>
							<circle
								cx="12.7588"
								cy="12"
								r="3"
								stroke="#16151C"
								stroke-width="1.5"
							/>
						</svg>
					</div>
					<div onClick={handleClickResume} className="cursor-pointer">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M8.22846 11.5303C7.93556 11.2374 7.93557 10.7626 8.22846 10.4697C8.52136 10.1768 8.99623 10.1768 9.28912 10.4697L12.0088 13.1893L12.0088 1C12.0088 0.585786 12.3445 0.25 12.7588 0.25C13.173 0.25 13.5088 0.585786 13.5088 1V13.1894L16.2285 10.4697C16.5214 10.1768 16.9962 10.1768 17.2891 10.4697C17.582 10.7626 17.582 11.2374 17.2891 11.5303L13.2891 15.5303C13.1484 15.671 12.9577 15.75 12.7587 15.75C12.5598 15.75 12.3691 15.671 12.2284 15.5303L8.22846 11.5303ZM7.0986 8.46913C7.35768 8.14594 7.3057 7.67392 6.98252 7.41484C6.65933 7.15576 6.1873 7.20774 5.92823 7.53093C4.7275 9.02878 4.00879 10.9315 4.00879 13C4.00879 17.8325 7.9263 21.75 12.7588 21.75C17.5913 21.75 21.5088 17.8325 21.5088 13C21.5088 10.9315 20.7901 9.02878 19.5894 7.53093C19.3303 7.20774 18.8583 7.15576 18.5351 7.41484C18.2119 7.67392 18.1599 8.14594 18.419 8.46913C19.4141 9.71047 20.0088 11.2848 20.0088 13C20.0088 17.0041 16.7629 20.25 12.7588 20.25C8.75472 20.25 5.50879 17.0041 5.50879 13C5.50879 11.2848 6.10351 9.71047 7.0986 8.46913Z"
								fill="#16151C"
							/>
						</svg>
					</div>
				</div>
			</Card>
			<Card className="grid grid-cols-4 p-5 text-xs">
				<h1 className="col-span-3 flex place-items-center">{resume!.letter_name}</h1>
				<div className="col-span-1 flex justify-end">
					<div onClick={handleViewLetter} className="cursor-pointer">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21.8891 9.8531C23.0487 11.0732 23.0487 12.9268 21.8891 14.1469C19.9333 16.2047 16.5743 19 12.7588 19C8.94327 19 5.58428 16.2047 3.6285 14.1469C2.46889 12.9268 2.46889 11.0732 3.62849 9.8531C5.58428 7.79533 8.94327 5 12.7588 5C16.5743 5 19.9333 7.79533 21.8891 9.8531Z"
								stroke="#16151C"
								stroke-width="1.5"
							/>
							<circle
								cx="12.7588"
								cy="12"
								r="3"
								stroke="#16151C"
								stroke-width="1.5"
							/>
						</svg>
					</div>
					<div onClick={handleClickLetter} className="cursor-pointer">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M8.22846 11.5303C7.93556 11.2374 7.93557 10.7626 8.22846 10.4697C8.52136 10.1768 8.99623 10.1768 9.28912 10.4697L12.0088 13.1893L12.0088 1C12.0088 0.585786 12.3445 0.25 12.7588 0.25C13.173 0.25 13.5088 0.585786 13.5088 1V13.1894L16.2285 10.4697C16.5214 10.1768 16.9962 10.1768 17.2891 10.4697C17.582 10.7626 17.582 11.2374 17.2891 11.5303L13.2891 15.5303C13.1484 15.671 12.9577 15.75 12.7587 15.75C12.5598 15.75 12.3691 15.671 12.2284 15.5303L8.22846 11.5303ZM7.0986 8.46913C7.35768 8.14594 7.3057 7.67392 6.98252 7.41484C6.65933 7.15576 6.1873 7.20774 5.92823 7.53093C4.7275 9.02878 4.00879 10.9315 4.00879 13C4.00879 17.8325 7.9263 21.75 12.7588 21.75C17.5913 21.75 21.5088 17.8325 21.5088 13C21.5088 10.9315 20.7901 9.02878 19.5894 7.53093C19.3303 7.20774 18.8583 7.15576 18.5351 7.41484C18.2119 7.67392 18.1599 8.14594 18.419 8.46913C19.4141 9.71047 20.0088 11.2848 20.0088 13C20.0088 17.0041 16.7629 20.25 12.7588 20.25C8.75472 20.25 5.50879 17.0041 5.50879 13C5.50879 11.2848 6.10351 9.71047 7.0986 8.46913Z"
								fill="#16151C"
							/>
						</svg>
					</div>
				</div>
			</Card>
		</div>
	);
}
