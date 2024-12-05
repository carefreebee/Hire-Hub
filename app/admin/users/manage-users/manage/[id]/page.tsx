import Link from "next/link";
import UpdateInput from "~/components/pages/admin/users/manage-users/update-input";
import ArrowLeft from "~/components/ui/arrow-left";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getDeptAndOffice, getUserByID } from "~/controller/UsersController";

function UserIDContainer({ children }: { children: React.ReactNode }) {
	return <div className="grid w-full items-center gap-6">{children}</div>;
}

type UserIDChildrenProps = {
	label: string;
	value: string;
};

function UserIDChildren({ label, value }: UserIDChildrenProps) {
	return (
		<div className="flex items-center gap-10">
			<Label className="w-44">{label}</Label>
			<Input type="text" value={value} readOnly className="shadow-md" />
		</div>
	);
}

export default async function UserIDPage({ params }: { params: { id: string } }) {
	const user = await getUserByID(params.id);
	const { department, office } = await getDeptAndOffice();

	return (
		<div className="flex min-h-screen flex-col">
			{/* Main Content */}
			<main className="bg-gray-100 flex-grow p-10">
				<section className="rounded-lg bg-white p-8 shadow">
					<h2 className="text-gray-700 mb-8 border-b pb-4 text-lg font-semibold">
						User ID: {user?.id}
					</h2>
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2">
						{/* Left Section */}
						<div className="flex flex-col gap-6">
							<UserIDContainer>
								<UserIDChildren
									label="First Name"
									value={user?.firstName || "N/A"}
								/>
								<UserIDChildren label="Last Name" value={user?.lastName || "N/A"} />
								<UserIDChildren
									label="E-mail Address"
									value={user?.email || "N/A"}
								/>
							</UserIDContainer>

							<Link
								href="/admin/users/manage-users"
								className="mt-10 flex items-center text-sm font-medium text-[#7F0000] hover:underline"
							>
								<ArrowLeft />
								<span className="ml-2">Go Back</span>
							</Link>
						</div>

						{/* Right Section */}
						<div className="bg-gray-50 rounded-lg p-6 ">
							<UpdateInput id={params.id} department={department} office={office} />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
