import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { DropdownMenuLabel } from "~/components/ui/dropdown-menu";
import { ApplicantFormType } from "~/types/types";
import UserInformation from "../pages/applicant/PersonalInformation";
import { Button } from "../ui/button";

type HeaderProps = {
	id: string;
	role: string;
	fullName: string;
	applicant: ApplicantFormType;
};

export default function Header({ id, role, fullName, applicant }: HeaderProps) {
	return (
		<header className="flex flex-col gap-3">
			<div className="flex items-center gap-5">
				<div className="h-16 w-16 rounded-full bg-[#D9D9D9]"></div>
				<div className="flex flex-col justify-center">
					<div className="text-lg font-bold">{fullName}</div>
					<small className="w-32 rounded-lg bg-[#F9E7BE] px-1.5 py-1 text-center font-medium text-slate-600">
						<b>Applicant</b> - ID {id}
					</small>
				</div>
			</div>

			<p className="border-gray-200 my-5 border"></p>

			{role === "recruitment_officer" ? (
				<div className="grid w-full grid-cols-2 items-center justify-center gap-3">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="relative w-full text-[#0F91D2] hover:text-blue-700"
							>
								View Info
							</Button>
						</DialogTrigger>
						<DialogContent className="w-full">
							<UserInformation applicant={applicant} />
						</DialogContent>
					</Dialog>

					<Button variant={"outline"} className="text-[#0F91D2] hover:text-blue-700">
						<Link href={`mailto:${applicant?.email}`}>Send Email</Link>
					</Button>
				</div>
			) : (
				<div className="grid w-full grid-cols-1 items-center justify-center gap-3">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="relative w-full text-[#0F91D2] hover:text-blue-700"
							>
								View Info
							</Button>
						</DialogTrigger>
						<DialogContent className="w-full">
							<UserInformation applicant={applicant} />
						</DialogContent>
					</Dialog>
				</div>
			)}
		</header>
	);
}

type DropDownContentComponentProps = {
	label: string;
	children: React.ReactNode;
};

function DropDownContentComponent({ label, children }: DropDownContentComponentProps) {
	return (
		<>
			<DropdownMenuLabel className="pb-0">{label}</DropdownMenuLabel>
			<DropdownMenuLabel className="pt-0 font-normal">{children}</DropdownMenuLabel>
		</>
	);
}
