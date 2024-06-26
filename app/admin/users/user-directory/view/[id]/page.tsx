import Link from "next/link";
import ArrowLeft from "~/components/ui/arrow-left";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getUsersByID } from "~/controller/UsersController";

function UserIDContainer({ children }: { children: React.ReactNode }) {
	return <div className="flex w-full flex-col items-center gap-1.5">{children}</div>;
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

export default async function ManageUserIDPage({ params }: { params: { id: string } }) {
	const user = await getUsersByID(params.id);

	const isDepartmentOrOffice =
		user?.selected_department !== null ? user?.selected_department : user?.selected_office;

	return (
		<section className="flex h-[474px] flex-col justify-end bg-white px-14">
			<div className="flex gap-20 text-[#6F767E]">
				<UserIDContainer>
					<UserIDChildren label="First Name" value={user?.firstName as string} />
					<UserIDChildren label="Last Name" value={user?.lastName as string} />
					<UserIDChildren label="E-mail Address" value={user?.email as string} />
				</UserIDContainer>
				<UserIDContainer>
					<UserIDChildren
						label="Position"
						value={user?.role.replaceAll("_", " ").toLowerCase() as string}
					/>
					<UserIDChildren label="Department" value={isDepartmentOrOffice as string} />
				</UserIDContainer>
			</div>
			<footer>
				<Link
					href={"/admin/users/user-directory"}
					className="mb-10 mt-20 flex items-center text-sm font-medium"
				>
					<ArrowLeft />
					Go Back
				</Link>
			</footer>
		</section>
	);
}
