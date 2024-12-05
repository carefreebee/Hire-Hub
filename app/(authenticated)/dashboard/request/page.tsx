import { User } from "~/lib/schema";
import { getJobReqByDeptOrOffice } from "~/controller/JobRequestController";
import { validateRequest } from "~/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Spinner } from "~/components/ui/spinner";
import { Suspense } from "react";
import TypographyH4 from "~/components/ui/typography-h4";


interface JobRequestListProps {
	user: User;
}

const JobRequestList = async ({ user }: JobRequestListProps) => {
	const jobRequest = await getJobReqByDeptOrOffice(user.department_id!, user.office_id!);
	return <DataTable columns={columns} data={jobRequest} />;
};

export default async function RequestPage() {
	const { user } = await validateRequest();

	// Check if the user is null, and handle accordingly
	if (!user) {
		// Redirect to login or show an error message if needed
		return <div>Please log in to view job requests.</div>;
	}

	  return (
			<section className="bg-slate-200/30 px-10 py-10">
				<TypographyH4 text="Job Request List" />
				<div className="container mx-auto px-10">
					<Suspense
						fallback={
							<div className="relative flex h-screen items-center justify-center">
								<div className="absolute top-1/3 -translate-y-1/4 transform">
									<Spinner size="lg" className="bg-red-500 dark:bg-red-700" />
									<span>Loading...</span>
								</div>
							</div>
						}
					>
						<JobRequestList user={user} />
					</Suspense>
				</div>
			</section>
		);
}
