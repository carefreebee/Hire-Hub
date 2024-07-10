import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import { authorizedRoles } from "~/util/filter-roles";

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
	else if (user?.role === "hr_head") return redirect("/dashboard/applicant");
	else if (authorizedRoles.includes(user?.role as RoleEnumsType[])) {
		return redirect("/dashboard/applicant");
	}

	return (
		<>
			{/* navigation placeholder */}
			<section className="h-20 w-full bg-gray-200"></section>
			<section
				className="xl:px-18 md:16 w-full sm:h-[50vh] sm:px-10 md:h-[60vh] lg:h-[65vh] lg:px-16 xl:h-[80vh] 2xl:px-20"
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
						<span className="font-black text-[#f8c400]">CIT-U!</span>
					</h1>
					<div className="sm:w-9/12 md:w-10/12 lg:w-10/12 xl:w-10/12 2xl:w-8/12">
						<p className="xl-font-medium sm:text-xs lg:text-base xl:text-lg 2xl:text-xl">
							Whether you&apos;re seeking a role in faculty, office administration, or
							departmental services, we invite dedicated individuals to join us in our
							mission of providing quality education.
						</p>
					</div>
					<div className="sm:w-1/5 md:w-1/5 xl:w-1/4">
						<Link href="/apply-now">
							<div className="w-full bg-[#f8c400] text-center text-white hover:scale-95 sm:rounded-lg sm:p-1 sm:px-5 sm:text-xs sm:font-semibold md:rounded-lg md:p-1.5 md:px-5 md:text-sm md:font-bold lg:rounded-xl lg:p-2 lg:px-10 lg:text-base xl:p-3 xl:text-xl">
								Apply Now
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="flex w-full justify-center sm:h-fit sm:flex-col sm:gap-y-8 sm:p-10 md:h-[280px] md:flex-row md:gap-x-8 md:px-14 lg:h-[310px] lg:gap-x-10 lg:px-20 xl:h-72 xl:px-28 2xl:h-[340px] 2xl:px-32">
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

			<section className="flex w-full flex-col items-center justify-center text-center text-black sm:mb-10 sm:h-[350px] sm:gap-y-1.5 md:mb-12 md:h-[400px] md:gap-y-2 lg:mb-14 lg:h-[500px] xl:mb-12 xl:h-[550px] xl:gap-y-2.5 2xl:gap-y-3">
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
					<a href="mailto:francegieb.mier@cit.edu">
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

			<section className="flex h-fit w-full flex-row bg-slate-300">
				<ImageGrid images={["1", "8", "7", "2"]} />
				<ImageGrid images={["3", "9", "11", "10"]} />
				<ImageGrid images={["5", "14", "12", "6"]} />
			</section>
		</>
	);
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconSrc, altText, title, description }) => {
	return (
		<div className="flex h-full items-center justify-center sm:w-full md:w-1/3 lg:w-1/3">
			<div className="flex flex-col justify-center rounded-3xl border border-gray-300 text-black shadow-lg drop-shadow-lg sm:h-56 sm:gap-y-2 sm:p-6 md:h-48 md:gap-y-2 md:p-4 md:py-3 lg:h-56 lg:gap-y-2 lg:p-6 xl:h-52 xl:gap-y-2 xl:p-6 2xl:h-56 2xl:gap-y-2.5 2xl:p-8">
				<img
					src={iconSrc}
					alt={altText}
					className="sm:h-16 sm:w-16 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
				/>
				<div className="flex flex-col gap-y-1">
					<h1 className="font-bold sm:text-2xl md:text-base lg:text-lg 2xl:text-xl">
						{title}
					</h1>
					<p className="sm:text-lg md:text-xs lg:text-sm 2xl:text-sm">{description}</p>
				</div>
			</div>
		</div>
	);
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
	return (
		<div className="flex h-full w-1/3 flex-row">
			<div className="flex h-full w-1/2 flex-col">
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[0]}.jpg`}
						alt=""
						className="h-full w-full"
					/>
				</div>
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[1]}.jpg`}
						alt=""
						className="h-full w-full"
					/>
				</div>
			</div>
			<div className="flex h-full w-1/2 flex-col">
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[2]}.jpg`}
						alt=""
						className="h-full w-full"
					/>
				</div>
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[3]}.jpg`}
						alt=""
						className="h-full w-full"
					/>
				</div>
			</div>
		</div>
	);
};
