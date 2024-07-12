import Previous from "~/components/pages/Previous";
import JobRequestForm from "~/components/pages/authenticated/add-job-request/JobRequestForm";
import { validateRequest } from "~/lib/auth";

export default async function AddNewRequestPage() {
	const { user } = await validateRequest();

	return (
		<section className="bg-slate-200/30">
			<div className="flex flex-col py-10">
				<Previous href="/dashboard/request" text="View all Request" />
				<JobRequestForm
					departmentId={user?.department_id as number}
					selectedDepartment={user?.selected_department as string}
					officeId={user?.office_id as number}
					selectedOffice={user?.selected_office as string}
				/>
			</div>
		</section>
	);
}
