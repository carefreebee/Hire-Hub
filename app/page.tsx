import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import { authorizedRoles } from "~/util/filter-roles";
import Image from "next/image";
import Footer from "~/components/Footer";
import JobListing from "~/components/JobListing";
import BrowseJobsButton from "~/components/BrowseJobsButton";
import JoblListingHeader from "~/components/JobListingHeader";

interface FeatureCardProps {
	iconSrc: string;
	altText: string;
	title: string;
	description: string;
}

interface ImageGridProps {
	images: string[];
}

export default async function Home() {
	const { user } = await validateRequest();

	if (user?.role === "user") return redirect("/user");
	else if (user?.role === "admin") return redirect("/admin/users/manage-users");
	// else if (user?.role === "hr_head") return redirect("/dashboard/applicant");
	else if (authorizedRoles.includes(user?.role as RoleEnumsType)) {
		return redirect("/dashboard/applicant");
	}

	return (
		<>
			<JoblListingHeader />
			<section
				className="xl:px-18 md:16 w-full p-10 sm:h-[50vh] sm:px-10 md:h-[60vh] lg:h-[65vh] lg:px-16 xl:h-[80vh] 2xl:px-20"
				style={{
					backgroundImage: `url(${"images/bgHeader.png"})`,
					backgroundSize: "cover",
					backgroundPosition: "left bottom",
					backgroundAttachment: "scroll",
					minHeight: "inherit",
				}}
			>
				<div className="flex h-full flex-col justify-end text-white sm:gap-y-1 sm:pb-6 md:gap-y-1.5 md:pb-8 lg:w-full lg:gap-y-2.5 lg:pb-8 xl:w-10/12 xl:gap-y-4 xl:pb-12 2xl:pb-20">
					<h1 className="font-bold sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
						Elevate your Career <br /> with{" "}
						<span className="font-black text-[#F1C543]">CIT-U!</span>
					</h1>
					<div className="sm:w-9/12 md:w-10/12 lg:w-10/12 xl:w-10/12 2xl:w-8/12">
						<p className="xl-font-medium sm:text-xs lg:text-base xl:text-lg 2xl:text-xl">
							Whether you&apos;re seeking a role in faculty, office administration, or
							departmental services, we invite dedicated individuals to join us in our
							mission of providing quality education.
						</p>
					</div>
					<BrowseJobsButton />
				</div>
			</section>

			<section className="mx-16 my-20 grid grid-cols-3 gap-20">
				<FeatureCard
					iconSrc="/images/icons/career.png"
					altText="career"
					title="Growth Opportunities"
					description="CIT fosters professional development and advancement opportunities for its employees."
				/>
				<FeatureCard
					iconSrc="/images/icons/inclusive.png"
					altText="inclusive"
					title="Inclusive Workplace"
					description="CIT prioritizes diversity and teamwork, fostering a supportive environment for all employees."
				/>
				<FeatureCard
					iconSrc="/images/icons/benefits.png"
					altText="benefits"
					title="Comprehensive Benefits"
					description="CIT offers company insurance and others, ensuring employee satisfaction and well-being."
				/>
			</section>

			<section className="my-10 flex w-full flex-col items-center justify-center bg-gray p-10 sm:mb-10 sm:h-[350px] sm:gap-y-1.5 md:mb-12 md:h-[400px] md:gap-y-2 lg:mb-14 lg:h-[500px] xl:mb-12 xl:h-[550px] xl:gap-y-2.5 2xl:gap-y-3">
				<div className="flex w-full items-center justify-center text-center">
					<h1 className="my-10 flex font-medium sm:text-4xl">
						How&nbsp;<p className="font-bold text-jobdetails">HIREHUB</p>&nbsp;works
					</h1>
				</div>
				<div>
					<img
						src="/images/randomphotos/hh-wrk/hh-wrk.png"
						alt="hh-wrk"
						className="h-auto w-[1020px]"
					/>
				</div>
				<div className="grid w-full grid-cols-4 justify-center text-center">
					<div className="flex flex-col content-center justify-center">
						<h2 className="text-l font-bold">Find suitable job</h2>
						<p className="my-5 text-sm text-darkGray">
							Browse and discover job opportunities that match your interests and
							skills.
						</p>
					</div>

					<div className="min-h-224 items- m-5 basis-1/4 flex-col place-content-center text-center align-middle">
						<h2 className="text-l font-bold">Fill-in personal information</h2>
						<p className="my-5 text-sm text-darkGray">
							Provide your personal details to complete your profile.
						</p>
					</div>

					<div className="min-h-224 items- m-5 basis-1/4 flex-col place-content-center text-center align-middle">
						<h2 className="text-l font-bold">Upload CV/Resume & Letter</h2>
						<p className="my-5 text-sm text-darkGray">
							Attach your CV and cover letter to support your application.
						</p>
					</div>

					<div className="min-h-224 items- m-5 basis-1/4 flex-col place-content-center text-center align-middle">
						<h2 className="text-l font-bold">Apply job</h2>
						<p className="my-5 text-sm text-darkGray">
							Submit your application for the desired position.
						</p>
					</div>
				</div>
			</section>

			<section
				id="joblisting"
				className="flex-col-2 flex w-full items-center justify-center text-center text-black sm:h-[350px] sm:gap-y-1.5 md:h-[400px] md:gap-y-2 lg:h-[500px] xl:h-[550px] xl:gap-y-2.5 2xl:gap-y-3"
			>
				<Image src="/images/Illustration.png" alt="icon" width={309} height={240} />
				<div className="flex-rows text-left">
					<h1 className="my-3 text-4xl font-bold">Careers in CIT-U</h1>
					<p>Browse for a job that matches your interests and skills.</p>
				</div>
			</section>

			<section className="flex-col-2 mb-10 flex w-full items-center justify-center">
				<JobListing />
			</section>

			<section className="flex w-full flex-col items-center justify-center bg-gray text-center text-black sm:h-[350px] sm:gap-y-1.5 md:h-[400px] md:gap-y-2 lg:h-[500px] xl:h-[550px] xl:gap-y-2.5 2xl:gap-y-3">
				<div className="flex flex-col gap-y-1">
					<h1 className="font-bold sm:text-2xl md:text-4xl xl:text-3xl 2xl:text-4xl">
						Have a question?
					</h1>
					<span className="font-extrabold sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
						Connect with CIT-U!
					</span>
				</div>
				<p className="sm:w-full sm:px-14 sm:text-sm md:w-8/12 md:text-sm xl:text-base 2xl:text-xl">
					Should you have any questions or need assistance, please don&apos;t hesitate to
					contact us. We&apos;re available to provide the support you require. Your
					inquiries are valuable to us, and we aim to address them promptly and
					effectively. We look forward to hearing from you!
				</p>
				<div className="flex flex-row items-center sm:gap-x-1.5 sm:py-1 md:gap-x-1.5 xl:gap-x-3 2xl:gap-x-4">
					<a href="mailto:intingkimberly20@gmail.com">
						<img
							src="/images/icons/email.png"
							alt="Email us"
							className="hover:scale-95 sm:h-8 sm:w-8 md:h-8 md:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12"
						/>
					</a>

					<a href="tel:(032)4112000">
						<img
							src="/images/icons/tel.png"
							alt="Call us"
							className="hover:scale-95 sm:h-8 sm:w-8 md:h-8 md:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12"
						/>
					</a>
					<a href="https://www.facebook.com/CITUniversity">
						<img
							src="/images/icons/facebook.png"
							alt="Message us"
							className="hover:scale-95 sm:h-8 sm:w-8 md:h-8 md:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12"
						/>
					</a>
				</div>
			</section>
			<Footer />
		</>
	);
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconSrc, altText, title, description }) => {
	return (
		<div className="inline-block items-center justify-center">
			<div className="border-gray-300 flex h-96 w-auto flex-col items-center justify-center rounded-3xl border px-7 text-black shadow-lg drop-shadow-lg">
				<img
					src={iconSrc}
					alt={altText}
					className="object-contain sm:h-16 sm:w-16 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
				/>
				<div className="mt-4 flex w-full flex-col justify-center gap-y-1 text-center">
					<h1 className="font-bold sm:text-2xl md:text-base lg:text-lg 2xl:text-xl">
						{title}
					</h1>
					<p className="mt-4 sm:text-lg md:text-xs lg:text-sm 2xl:text-sm">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};
