import EditJobrequestForm from "~/components/pages/authenticated/edit-job-request/EditJobRequestForm";
import Previous from "~/components/pages/Previous";
import { getAllJobRequestByID } from "~/controller/JobRequestController";
import { JobRequestSelect } from "~/lib/schema";

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const jobRequestByID = await getAllJobRequestByID(Number(params.id));

	return (
		<section className="bg-slate-200/30">
			<div className="flex flex-col py-10">
				<Previous href="/dashboard/request" text="New Request Form" />
				<EditJobrequestForm
					jobRequestByID={jobRequestByID as JobRequestSelect}
					id={Number(params.id)}
				/>
			</div>
		</section>
	);
}
