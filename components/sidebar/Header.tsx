import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";

type HeaderProps = {
	id: string;
	fullName: string;
	email: string;
	positionType: string;
	positionApplied: string;
	contactNumber: number;
	communicationType: string;
};

export default async function Header({
	id,
	fullName,
	email,
	positionType,
	positionApplied,
	contactNumber,
	communicationType,
}: HeaderProps) {
	return (
		<header className="flex flex-col gap-3">
			<div className="flex items-center gap-5">
				<div className="h-16 w-16 rounded-full bg-[#D9D9D9]"></div>
				<div className="flex flex-col justify-center">
					<div className="text-lg font-bold">{fullName}</div>
					<small className="w-32 bg-[#F9E7BE] px-1.5 rounded-lg py-1 text-center font-medium text-slate-600">
						<b>Applicant</b> - ID {id}
					</small>
				</div>
			</div>

			<p className="my-5 border border-gray-200"></p>

			<div className="flex w-full flex-col items-center justify-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="relative mb-3 w-full shadow-md">
							Applicant Information
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[253px]">
						<DropDownContentComponent label="Applied As">
							{positionType}
						</DropDownContentComponent>
						<DropdownMenuSeparator />

						<DropDownContentComponent label="Applied As">
							{positionApplied}
						</DropDownContentComponent>
						<DropdownMenuSeparator />

						<DropDownContentComponent label="Email">{email}</DropDownContentComponent>
						<DropdownMenuSeparator />

						<DropDownContentComponent label="Contact Number">
							{contactNumber}
						</DropDownContentComponent>
						<DropdownMenuSeparator />

						<DropDownContentComponent label="Preferred Mode">
							{communicationType}
						</DropDownContentComponent>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button variant={"outline"} className="w-full text-blue-700 hover:text-blue-700">
					<Link href={`mailto:${email}`}>Send Email</Link>
				</Button>
			</div>
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
