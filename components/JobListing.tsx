/* eslint-disable react/jsx-key */
"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllJobRequest } from "~/controller/JobRequestController";
import { useEffect, useState } from "react";

type JobRequest = {
	department_id: number | null;
	office_id: number | null;
	request_id: number;
	requested_position: string;
	requested_category: string;
	requested_department: string | null;
	requested_office: string | null;
	requested_type: string;
	requested_description: string;
	requested_qualification: string;
	requested_date: Date | null;
};

export default function JobListing() {
	const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);

	useEffect(() => {
		const fetchJobRequests = async () => {
			const response = await getAllJobRequest();
			setJobRequests(response);
		};

		fetchJobRequests();
	}, []);

	const isTeachingStaff = (category: string) => {
		if (category === "teaching_staff") {
			return 1;
		} else {
			return 0;
		}
	};

	const isFullTime = (type: string) => {
		if (type === "full_time") {
			return 1;
		} else {
			return 0;
		}
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const formatMonth = (month: number) => {
		return monthNames[month];
	};

	return (
		<>
			<ScrollArea className="h-auto max-h-[1052] w-[1200px] rounded-md p-4">
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					{jobRequests.map((job) => (
						<Card className="mb-5 h-auto max-w-[600px] bg-gradient-to-r from-lightorange to-white">
							<CardHeader>
								<CardTitle>{job.requested_position}</CardTitle>
								<div className="inline-block h-auto w-auto grid-cols-2">
									{isTeachingStaff(job.requested_category) ? (
										<div className="mr-2 inline-block h-auto w-auto rounded-sm bg-customorange px-4 py-1 font-bold text-white">
											TEACHING STAFF
										</div>
									) : (
										<div className="mr-2 inline-block h-auto w-auto rounded-sm bg-customorange px-4 py-1 font-bold text-white">
											NON TEACHING STAFF
										</div>
									)}
									{isFullTime(job.requested_type) ? (
										<div className="inline-block h-auto w-auto rounded-sm bg-customlightgreen px-4 py-1 font-bold text-customgreen">
											FULL-TIME
										</div>
									) : (
										<div className="inline-block h-auto w-auto rounded-sm bg-customlightgreen px-4 py-1 font-bold text-customgreen">
											PART-TIME
										</div>
									)}
								</div>
							</CardHeader>
							<CardContent className="h-10">
								<p className="font-bold text-black">{job.requested_department}</p>
							</CardContent>
							<CardFooter className="mb-3 flex h-1 w-full justify-between">
								{job.requested_date ? (
									<p className="text-customgray">
										Date Posted: {job.requested_date.getDate()}{" "}
										{formatMonth(job.requested_date.getMonth())}{" "}
										{job.requested_date.getFullYear()}
									</p>
								) : (
									<p className="text-customgray">Date Posted: --- --- ---</p>
								)}
								<p className="font-bold text-jobdetails">View Job Details -&gt;</p>
							</CardFooter>
						</Card>
					))}
				</div>
			</ScrollArea>
		</>
	);
}
