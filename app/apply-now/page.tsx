import ApplicantForm from "~/components/pages/applicant/ApplicantForm";
import { getAllJobRequest } from "~/Controller/JobRequestController";
import { DepartmentSelect, OfficeSelect } from "~/lib/schema";

export default async function ApplyNow() {
	const jobRequest = await getAllJobRequest();

	// GETTING THE REQUESTED DEPARTMENT
	const department = jobRequest.map((department) => ({
		department_id: department.department_id,
		department_name: department.requested_department,
	}));

	// GETTING THE REQUESTED OFFICE
	const office = jobRequest.map((office) => ({
		office_id: office.office_id,
		office_name: office.requested_office,
	}));

	return (
		<section className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-gradient-to-b from-[#fff8e0] to-[#FFCB78] px-24 py-14 text-white">
			<h1 className="mb-8 text-lg font-semibold text-[#344054]">Applicant Information</h1>
			<ApplicantForm
				department={department as DepartmentSelect[]}
				office={office as OfficeSelect[]}
			/>
		</section>
	);
}
