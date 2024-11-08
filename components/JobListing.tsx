/* eslint-disable react/jsx-key */
"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllJobRequest } from "~/controller/JobRequestController";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

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
	job_status: string;
	job_opening: string;
};

export default function JobListing() {
	const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchJobRequests = async () => {
			const response = await getAllJobRequest();
			const approvedJobs = response.filter(
				(job) => job.job_status === "approved" && job.job_opening === "open"
			);
			setJobRequests(approvedJobs);
		};

		setTimeout(setIsLoading, 2000);
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

	const checkJobReqSize = () => {
		return jobRequests.length > 4 ? 1 : 0;
	};

	return (
		<>
			<ScrollArea
				style={{
					height: checkJobReqSize() ? "75rem" : "30rem",
				}}
				className="w-[90%] rounded-md p-4"
			>
				{isLoading ? (
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
						<Skeleton className="h-40 w-[100%]" />
						<Skeleton className="h-40 w-[100%]" />
						<Skeleton className="h-40 w-[100%]" />
						<Skeleton className="h-40 w-[100%]" />
					</div>
				) : (
					<>
						{jobRequests.length > 0 ? (
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
											<p className="font-bold text-black">
												{job.requested_department}
											</p>
										</CardContent>
										<CardFooter className="mb-3 flex h-1 w-full justify-between">
											{job.requested_date ? (
												<p className="text-customgray">
													Date Posted: {job.requested_date.getDate()}{" "}
													{formatMonth(job.requested_date.getMonth())}{" "}
													{job.requested_date.getFullYear()}
												</p>
											) : (
												<p className="text-customgray">
													Date Posted: --- --- ---
												</p>
											)}
											<Link
												href={`jobs/${job.request_id}`}
												className="hover:underline"
											>
												<p className="font-bold text-jobdetails">
													View Job Details -&gt;
												</p>
											</Link>
										</CardFooter>
									</Card>
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center">
								<div>
									<svg
										width="189"
										height="181"
										viewBox="0 0 189 181"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clip-path="url(#clip0_1671_7215)">
											<path
												opacity="0.2"
												d="M94.5002 107.469C69.6186 107.506 45.1691 101.242 23.631 89.3112V147.063C23.631 147.806 23.7837 148.541 24.0806 149.227C24.3774 149.914 24.8124 150.537 25.3609 151.062C25.9093 151.588 26.5604 152.004 27.277 152.288C27.9936 152.573 28.7616 152.719 29.5372 152.719H159.475C160.25 152.719 161.018 152.573 161.735 152.288C162.452 152.004 163.103 151.588 163.651 151.062C164.2 150.537 164.635 149.914 164.931 149.227C165.228 148.541 165.381 147.806 165.381 147.063V89.3047C143.84 101.24 119.386 107.506 94.5002 107.469Z"
												fill="#505050"
											/>
											<path
												d="M159.475 50.9062H29.5372C26.2753 50.9062 23.631 53.4386 23.631 56.5625V147.063C23.631 150.186 26.2753 152.719 29.5372 152.719H159.475C162.737 152.719 165.381 150.186 165.381 147.063V56.5625C165.381 53.4386 162.737 50.9062 159.475 50.9062Z"
												stroke="#3E3B3B"
												stroke-width="5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M124.031 50.9062V39.5938C124.031 36.5935 122.787 33.7161 120.571 31.5946C118.356 29.4731 115.352 28.2813 112.219 28.2812H76.7812C73.6484 28.2813 70.6438 29.4731 68.4286 31.5946C66.2133 33.7161 64.9688 36.5935 64.9688 39.5938V50.9062"
												stroke="#3E3B3B"
												stroke-width="5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M165.381 89.3047C143.84 101.24 119.386 107.506 94.5 107.469C69.6181 107.506 45.1682 101.242 23.6299 89.3107"
												stroke="#3E3B3B"
												stroke-width="4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M85.6406 84.8438H103.359"
												stroke="#505050"
												stroke-width="6"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M182.187 147.773C182.187 159.001 173.037 168.103 161.749 168.103C150.461 168.103 141.31 159.001 141.31 147.773C141.31 136.545 150.461 127.443 161.749 127.443C173.037 127.443 182.187 136.545 182.187 147.773Z"
												fill="#FFE6E6"
											/>
											<path
												d="M170.832 138.738L152.665 156.808M152.665 138.738L170.833 156.808M182.187 147.773C182.187 159.001 173.037 168.103 161.749 168.103C150.461 168.103 141.31 159.001 141.31 147.773C141.31 136.545 150.461 127.443 161.749 127.443C173.037 127.443 182.187 136.545 182.187 147.773Z"
												stroke="#7F0000"
												stroke-width="4.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_1671_7215">
												<rect width="189" height="181" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
								<p>No job vacancy available at the moment.</p>
							</div>
						)}
					</>
				)}
			</ScrollArea>
		</>
	);
}
