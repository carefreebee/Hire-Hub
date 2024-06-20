import ApplicantForm from "~/components/pages/applicant/ApplicantForm";

export default async function ApplyNow() {
	return (
		<section className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-gradient-to-b from-[#fff8e0] to-[#FFCB78] px-24 py-14 text-white">
			<h1 className="mb-8 text-lg font-semibold text-[#344054]">Applicant Information</h1>
			<ApplicantForm />
		</section>
	);
}
