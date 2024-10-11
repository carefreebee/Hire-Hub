import Image from "next/image";
import GeneralHeader from "~/components/GeneralHeader";
import ApplicantHeader from "~/public/images/applicant-header.png";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<GeneralHeader />
			<header className="relative h-[227px]">
				<Image src={ApplicantHeader} alt="Applicant Header png" fill />
			</header>
			{children}
		</section>
	);
}
