"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllApplicantForm } from "~/controller/ApplicantFormController";
import { formatDistanceToNow, format } from "date-fns";
import { ApplicantSelect } from "~/lib/schema";
import { getCurrentUser } from "~/actions/actions";

export default function NotificationPage() {
	const [applicants, setApplicants] = useState<ApplicantSelect[]>([]);
	 const [currentUserId, setCurrentUserId] = useState<string | null>(null);

		useEffect(() => {
			const fetchUser = async () => {
				const user = await getCurrentUser();
				if (user) {
					setCurrentUserId(user.id);
				}
			};
			fetchUser();
		}, []);

	const [notifications, setNotifications] = useState<
		{
			message: string;
			time: string;
			applicantName: string;
			stageName: string;
			stageDate: string;
		}[]
	>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const notificationsPerPage = 10;

	useEffect(() => {
		const fetchApplicants = async () => {
			const applicantsData = await getAllApplicantForm();
			setApplicants(applicantsData);
		};
		fetchApplicants();
	}, []);

	useEffect(() => {
		const generateNotifications = () => {
			const newNotifications = applicants
				.flatMap((applicant) => {
					return Object.entries(applicant.stages || {}).map(([stageName, stage]) => {
						if (
							stage &&
							stage.assessed_by &&
							Array.isArray(stage.assessed_by) &&
							stage.assessed_by.includes(currentUserId)
						) {
							if (stage && "date" in stage) {
								const stageDate = new Date(stage.date as string);
								return {
									message: `You are assigned as an Evaluator`,
									time: stageDate.toISOString(),
									applicantName: `${applicant.first_name} ${applicant.last_name}`,
									stageName: stageName.replace("_", " "),
									stageDate: stageDate.toISOString(),
								};
							}
						}
						return null;
					});
				})
				.filter(
					(
						notification
					): notification is {
						message: string;
						time: string;
						applicantName: string;
						stageName: string;
						stageDate: string;
					} => notification !== null
				);

			setNotifications(newNotifications);
		};

		generateNotifications();
	}, [applicants, currentUserId]);

	const sortedNotifications = useMemo(() => {
		return notifications.sort(
			(a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
		);
	}, [notifications]);

	const totalPages = Math.ceil(sortedNotifications.length / notificationsPerPage);

	const paginatedNotifications = sortedNotifications.slice(
		(currentPage - 1) * notificationsPerPage,
		currentPage * notificationsPerPage
	);

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	return (
		<div className="flex min-h-screen flex-col bg-slate-200/30">
			<div className="ml-8 mt-6">
				<h1 className="text-gray-800 text-3xl font-semibold">Notifications</h1>
			</div>

			<div className="max-w-7xl flex-1 overflow-y-auto px-8 py-6">
				{sortedNotifications.length === 0 ? (
					<div className="text-gray-500 text-center">No notifications at the moment.</div>
				) : (
					<div className="space-y-2">
						{paginatedNotifications.map((notification, idx) => (
							<div
								key={idx}
								className="rounded-md border bg-white p-4 transition-all duration-200 hover:bg-slate-100"
							>
								<div className="flex items-center space-x-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-lg text-white">
										<span className="font-bold">!</span>
									</div>
									<div className="flex-1">
										<p className="text-sm font-semibold">
											You are assigned as an Evaluator
										</p>
										<div className="flex items-center justify-between">
											<p className="text-gray-500 text-xs">
												{notification.stageName} | Applicant:{" "}
												{notification.applicantName} | Scheduled:{" "}
												{new Date(notification.stageDate).toLocaleString(
													"en-US",
													{
														month: "short",
														day: "numeric",
														year: "numeric",
														hour: "numeric",
														minute: "numeric",
														hour12: true,
													}
												)}
											</p>
											<p className="text-gray-500 text-xs">
												{formatDistanceToNow(new Date(notification.time), {
													addSuffix: true,
												})}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="mt-6 flex items-center justify-between">
					<button
						onClick={handlePrevious}
						disabled={currentPage === 1}
						className={`rounded px-4 py-2 ${
							currentPage === 1
								? "bg-gray-300 cursor-not-allowed"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						Previous
					</button>
					<p>
						Page {currentPage} of {totalPages}
					</p>
					<button
						onClick={handleNext}
						disabled={currentPage === totalPages}
						className={`rounded px-4 py-2 ${
							currentPage === totalPages
								? "bg-gray-300 cursor-not-allowed"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

