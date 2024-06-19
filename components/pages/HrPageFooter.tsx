import { Button } from "../ui/button";
import Profile from "../ui/profile";
import { TypographySmall } from "../ui/typography-small";

export default function HrPageFooter() {
	return (
		<section className="flex gap-5">
			<div className="flex-1 border-2">
				<header className="flex items-center border-b-2">
					<div>
						<TypographySmall className="px-5">Comments</TypographySmall>
					</div>
				</header>
				<div className="my-5 ml-5 flex flex-col gap-3">
					<div className="flex items-center">
						<Profile />
						<div className="flex flex-col">
							<TypographySmall size={"sm"} className="mb-2 px-3">
								Jane Anonymous | Human Resource Staff
							</TypographySmall>
							<TypographySmall size={"sm"} className="px-3 pt-0 text-xs">
								Candidate is good in technical skills and has 3 year experience
							</TypographySmall>
						</div>
					</div>

					<div className="flex items-center">
						<Profile />
						<div className="flex flex-col">
							<TypographySmall size={"sm"} className="mb-2 px-3">
								Jane Anonymous | Human Resource Staff
							</TypographySmall>
							<TypographySmall size={"sm"} className="px-3 pt-0 text-xs">
								Candidate is good in technical skills and has 3 year experience
							</TypographySmall>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 border-2">
				<header className="flex items-center justify-between border-b-2">
					<TypographySmall className="px-5">Documents</TypographySmall>
					<Button className="bg-transparent text-[#407BFF] hover:bg-transparent">
						Download all
					</Button>
				</header>
				<div className="flex items-center">
					<div className="m-5 flex gap-5">
						<Button
							variant={"outline"}
							className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
						>
							Resume
						</Button>
						<Button
							variant={"outline"}
							className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
						>
							CV Letter
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
