import NewApplicantForm from "~/components/pages/applicant/NewApplicantForm";
import { Card } from "~/components/ui/card";
import { getJobRequest } from "~/Controller/JobRequestController";
import { DepartmentSelect, OfficeSelect } from "~/lib/schema";

export default async function ApplyNow() {
	const jobRequest = await getJobRequest();

	return (
		<Card className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-white px-24 py-14 text-white">
			<h1 className="mb-8 text-lg font-semibold text-[#344054]">Personal Information</h1>
			<NewApplicantForm
				department={jobRequest.department as DepartmentSelect[]}
				office={jobRequest.office as OfficeSelect[]}
			/>
		</Card>
	);
}
