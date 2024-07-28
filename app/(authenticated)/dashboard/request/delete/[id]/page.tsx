import DeleteJobrequestForm from "~/components/pages/authenticated/delete-job-request/DeleteJobRequestForm";
import Previous from "~/components/pages/Previous";
import { getJobRequestByID } from "~/Controller/JobRequestController";
import { JobRequestSelect } from "~/lib/schema";

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const jobRequestByID = await getJobRequestByID(Number(params.id));

	return (
		<section className="bg-slate-200/30">
			<div className="flex flex-col py-10">
				<Previous href="/dashboard/request" text="New Request Form" />
				<DeleteJobrequestForm
					jobRequestByID={jobRequestByID as JobRequestSelect}
					id={Number(params.id)}
				/>
			</div>
		</section>
	);
}
