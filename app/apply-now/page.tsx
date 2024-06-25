import ApplicantForm from "~/components/pages/applicant/ApplicantForm";
import { getAllJobRequest } from "~/controller/JobRequestController";

export default async function ApplyNow() {
	const job = await getAllJobRequest();

	const requestedDepartment = job
		.filter((job) => job.requested_department !== null)
		.map((job) => job.requested_department) as string[];

	const requestedOffice = job
		.filter((job) => job.requested_office !== null)
		.map((job) => job.requested_office) as string[];

	return (
		<section className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-gradient-to-b from-[#fff8e0] to-[#FFCB78] px-24 py-14 text-white">
			<h1 className="mb-8 text-lg font-semibold text-[#344054]">Applicant Information</h1>
			<ApplicantForm
				requestedDepartment={requestedDepartment}
				requestedOffice={requestedOffice}
			/>
		</section>
	);
}
