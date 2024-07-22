import ApplicantForm from "~/components/pages/applicant/ApplicantForm";
import { getJobRequest } from "~/Controller/JobRequestController";
import { DepartmentSelect, OfficeSelect } from "~/lib/schema";

export default async function ApplyNow() {
	const jobRequest = await getJobRequest();

	return (
		<section className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-gradient-to-b from-[#fff8e0] to-[#FFCB78] px-24 py-14 text-white">
			<h1 className="mb-8 text-lg font-semibold text-[#344054]">Applicant Information</h1>
			<ApplicantForm
				department={jobRequest.department as DepartmentSelect[]}
				office={jobRequest.office as OfficeSelect[]}
			/>
		</section>
	);
}
