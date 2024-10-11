"use client";

export default function BrowseJobsButton() {
	const goToCareers = () => {
		const careerSection = document.getElementById("joblisting");
		if (careerSection) {
			careerSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<div className="cursor-pointer sm:w-1/5 md:w-1/5 xl:w-1/4">
				<div
					onClick={goToCareers}
					className="w-full bg-[#F1C543] text-center text-white hover:scale-95 sm:rounded-lg sm:p-1 sm:px-5 sm:text-xs sm:font-semibold md:rounded-lg md:p-1.5 md:px-5 md:text-sm md:font-bold lg:rounded-xl lg:p-2 lg:px-10 lg:text-base xl:p-3 xl:text-xl"
				>
					Browse Jobs
				</div>
			</div>
		</>
	);
}
