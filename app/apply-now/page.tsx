import ApplicantForm from "~/components/pages/applicant/ApplicantForm";

export default async function ApplyNow() {
	return (
		<section className="mx-auto my-8 w-11/12 gap-10 rounded-xl bg-orange-400 p-10 text-white">
			<h1 className="text-2xl font-bold mb-5">APPLICANT INFORMATION</h1>
			<ApplicantForm />
		</section>
	);
}
