import Image from "next/image";
import ApplicantHeader from "~/public/images/applicant-header.png";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<header className="relative h-[227px]">
				<Image src={ApplicantHeader} alt="Applicant Header png" fill />
			</header>
			{children}
		</section>
	);
}
