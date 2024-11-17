"use client";

import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import Footer from "~/components/Footer";
import JoblListingHeader from "~/components/JobListingHeader";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { getJobRequestByID } from "~/controller/JobRequestController";

type LayoutProps = {
	children: React.ReactNode;
	params: { id: number };
};

type Job = {
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

export default function Page({ params }: LayoutProps) {
	const [job, setJob] = useState<Job>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchJob = async () => {
			const response = await getJobRequestByID(params.id);
			setJob(response);
		};

		fetchJob();
	}, [params.id]);

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

	return (
		<>
			<div className="h-screen w-full flex-col">
				<JoblListingHeader />
				{job && isLoading ? (
					<div className="mb-20 ml-24 mt-12">
						<section className="grid grid-cols-2">
							<div>
								<p className="text-2xl">{job.requested_position}</p>
								<div className="mt-5">
									{isTeachingStaff(job.requested_category) ? (
										<p className="mr-2 inline-block text-xl text-[#474C54]">
											{job.requested_department}
										</p>
									) : (
										<p className="mr-2 inline-block text-xl text-[#474C54]">
											{job.requested_office}
										</p>
									)}

									<div className="inline-block h-auto w-auto grid-cols-2">
										{isTeachingStaff(job.requested_category) ? (
											<div className="mr-2 inline-block h-auto w-auto rounded-sm bg-[#FFBA00] px-4 py-1 text-white">
												TEACHING STAFF
											</div>
										) : (
											<div className="mr-2 inline-block h-auto w-auto rounded-sm bg-[#FFBA00] px-4 py-1 text-white">
												NON TEACHING STAFF
											</div>
										)}
										{isFullTime(job.requested_type) ? (
											<div className="inline-block h-auto w-auto rounded-sm bg-[#0BA02C] px-4 py-1 text-white">
												FULL-TIME
											</div>
										) : (
											<div className="inline-block h-auto w-auto rounded-sm bg-[#0BA02C] px-4 py-1 text-white">
												PART-TIME
											</div>
										)}
									</div>
								</div>
							</div>

							<div className="ml-96">
								<h1 className="text-customgray">JOB POSTED:</h1>
								{job.requested_date ? (
									<p className="mt-3 text-xl font-medium">
										{job.requested_date.getDate()}{" "}
										{formatMonth(job.requested_date.getMonth())}{" "}
										{job.requested_date.getFullYear()}
									</p>
								) : (
									<p className="mt-3 text-customgray">--- --- ---</p>
								)}
							</div>
						</section>

						<section className="mt-8 flex flex-col">
							<h1 className="mb-5 text-xl font-semibold">Job Description:</h1>
							<p className="text-[#5E6670]">{job.requested_description}</p>
						</section>

						<section className="mt-8 flex flex-col">
							<h1 className="mb-5 text-xl font-semibold">Job Qualifications:</h1>
							<p className="text-[#5E6670]">{job.requested_qualification}</p>
						</section>

						<Button
							asChild
							className="mt-20 w-40 bg-jobdetails text-white hover:scale-95 hover:bg-[#5e1e1e]"
						>
							<Link href={`/apply-now/${job.request_id}`}>Apply Now</Link>
						</Button>
					</div>
				) : (
					<div className="ml-24 mt-16 flex flex-col">
						<Skeleton className="mb-2 ml-5 h-10 w-96" />
						<Skeleton className="mb-10 ml-5 h-10 w-[30rem]" />
						<Skeleton className="mb-2 ml-5 h-10 w-[30rem]" />
						<Skeleton className="mb-2 ml-5 h-10 w-[50rem]" />
						<Skeleton className="mb-2 ml-5 h-10 w-[50rem]" />
						<Skeleton className="mb-2 ml-5 h-10 w-[50rem]" />
						<Skeleton className="mb-2 ml-5 h-10 w-[50rem]" />
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}
