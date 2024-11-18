"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Previous from "~/components/pages/Previous";
import { Button } from "~/components/ui/button";
import { TypographySmall } from "~/components/ui/typography-small";
import { getJobRequestByID } from "~/controller/JobRequestController";
import { JobRequestSelect } from "~/lib/schema";

export default function ApprovalPage() {
	const { id: request_id } = useParams();
	const [job, setJob] = useState<JobRequestSelect>();

	async function fetchApprovalbyId() {
		const job = await getJobRequestByID(Number(request_id));
		setJob(job);
	}

	useEffect(() => {
		fetchApprovalbyId();
	}, []);

	return (
		<div className="mx-auto flex w-full flex-col gap-5 p-5">
			<Previous href="/dashboard/approvals" text="View all Job Requests" />
			<div className="bg-slate-200/30 px-10 py-10">
				<div className="container mx-auto px-10">
					<div className="my-5 h-[675px] rounded-lg border bg-white">
						<div className="flex h-[90%] flex-col items-center justify-center p-8">
							{/*border if ever */}
							<div className="flex h-full w-full">
								<div className="flex w-full items-center justify-center gap-8">
									<div className="flex h-full w-[50%] flex-col justify-center gap-8">
										<div className="flex flex-col">
											Requested Position
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_position}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Category
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_category
													? "Teaching Staff"
													: "Non-Teaching Staff"}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Department
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_department ?? "N/A"}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Type
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_type ? "Full-Time" : "Part-Time"}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Description
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_description}
											</TypographySmall>
										</div>
									</div>
									<div className="flex h-full w-[50%] flex-col justify-center gap-8">
										<div className="flex flex-col">
											Qualification Standards: Educational Background
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												{job?.requested_qualification}
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Qualification Standards: Experience
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												DSADSADSADA
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Qualification Standards: Knowledge, Skills & Abilities
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												DSADSADSADA
											</TypographySmall>
										</div>
										<div className="flex flex-col">
											Major Duties and Responsibility
											<TypographySmall
												size={"sm"}
												variant={"outline"}
												className="font-medium shadow-md"
											>
												DSADSADSADA
											</TypographySmall>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex w-full items-center justify-center">
							<div className="flex w-[90%] items-center justify-between">
								<div>Requested By: </div>
								<div className="flex items-center justify-center gap-2">
									<Button className="font-bold text-green-500" variant="outline">
										Approve
									</Button>
									<Button className="font-bold text-red-500" variant="outline">
										Decline
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
