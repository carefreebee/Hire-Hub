import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";

export default async function ApplicantResume({ applicantId }: { applicantId: string }) {
	const applicant = await getApplicantFormByID(Number(applicantId));

	return (
		<Button
			variant={"outline"}
			asChild
			className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
		>
			<Link href={applicant?.resume as string} target="_blank">
				Resume
			</Link>
		</Button>
	);
}
