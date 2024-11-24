"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "~/actions/actions";
import { formatDistanceToNow } from "date-fns";

const dummyNotifications = [
	{
		message: "Hi {user}, your notification message goes here",
		time: "2024-11-24T23:19:00+15:55",
	},
	{
		message: "Hi {user}, your notification message goes here",
		time: "2024-10-24T09:00:00.000Z",
	},
	{
		message: "Hi {user}, your notification message goes here",
		time: "2024-11-23T09:00:00.000Z",
	},
	{
		message: "Hi {user}, your notification message goes here",
		time: "2024-11-24T23:19:00+15:55",
	},
	{
		message: "Hi {user}, your notification message goes here",
		time: "2024-11-23T23:19:00+15:55",
	},
];

export default function NotificationPage() {
	const [user, setCurrentUser] = useState<{ firstName: string; lastName: string } | null>(null);

	useEffect(() => {
		async function fetchCurrentUser() {
			const user = await getCurrentUser();
			if (user) {
				setCurrentUser({
					firstName: user.firstName ?? "Firstname",
					lastName: user.lastName ?? "Lastname",
				});
			}
		}
		fetchCurrentUser();
	}, []);

		const notificationsToDisplay = user
			? dummyNotifications
					.map((notif) => ({
						...notif,
						message: notif.message.replace(
							"{user}",
							`${user.firstName} ${user.lastName}`
						),
						formattedTime: formatDistanceToNow(new Date(notif.time), {
							addSuffix: true,
						}),
					}))
					.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()) // Sort notifications by time (newest first)
			: [];

	return (
		<div className="flex min-h-screen flex-col bg-slate-200/30">
			<div className="ml-8 mt-6">
				<h1 className="text-gray-800 text-3xl font-semibold">Notifications</h1>
			</div>

			<div className="max-w-7xl flex-1 overflow-y-auto px-8 py-6">
				<div className="space-y-2">
					{notificationsToDisplay.length === 0 ? (
						<div className="text-gray-500 text-center">
							No notifications at the moment.
						</div>
					) : (
						notificationsToDisplay.map((notif, index) => (
							<div
								key={index}
								className="rounded-md border bg-white p-4 transition-all duration-200 hover:bg-slate-100"
							>
								<div className="flex items-center space-x-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-lg text-white">
										<span className="font-bold">
											{user ? user.firstName[0] : "U"}
										</span>
									</div>
									<div className="flex-1">
										<p className="text-sm font-semibold">{notif.message}</p>
									</div>
									<div className="ml-auto">
										<p className="text-gray-500 text-xs">
											{notif.formattedTime}
										</p>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
