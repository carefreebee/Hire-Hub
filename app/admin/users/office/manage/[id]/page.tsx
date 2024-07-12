import Link from "next/link";
import UpdateInput from "~/components/pages/authenticated/admin/users/manage-users/update-input";
import ArrowLeft from "~/components/ui/arrow-left";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getAllDepartment, getAllOffice } from "~/controller/DepartmentOrOfficeController";
import { getUserByID } from "~/controller/UsersController";

function UserIDContainer({ children }: { children: React.ReactNode }) {
	return <div className="grid w-full items-center gap-1.5">{children}</div>;
}

type UserIDChildrenProps = {
	label: string;
	value: string;
};

function UserIDChildren({ label, value }: UserIDChildrenProps) {
	return (
		<>
			<div className="flex items-center gap-10">
				<Label className="w-44">{label}</Label>
				<Input type="text" value={value} readOnly className="shadow-md" />
			</div>
		</>
	);
}

export default async function UserIDPage({ params }: { params: { id: string } }) {
	const user = await getUserByID(params.id);
	const department = await getAllDepartment();
	const office = await getAllOffice();

	return (
		<section className="mb-32 flex flex-col gap-20 bg-white">
			<p className="border-b px-10 py-3 text-sm font-semibold">User ID {user?.id}</p>
			<div className="flex justify-between px-10">
				<div className="flex flex-col text-[#6F767E]">
					<UserIDContainer>
						<UserIDChildren label="First Name" value={user?.firstName as string} />
						<UserIDChildren label="Last Name" value={user?.lastName as string} />
						<UserIDChildren label="E-mail Address" value={user?.email as string} />
					</UserIDContainer>

					<Link
						href={"/admin/users/manage-users"}
						className="mb-10 mt-20 flex items-center text-sm font-medium"
					>
						<ArrowLeft />
						Go Back
					</Link>
				</div>
				<div className="flex flex-col gap-10 text-[#6F767E]">
					<UpdateInput id={params.id} department={department} office={office} />
				</div>
			</div>
		</section>
	);
}
