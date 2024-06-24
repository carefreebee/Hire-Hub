import Image from "next/image";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import { validateRequest } from "~/lib/auth";
import Pending from "~/public/svg/pending.svg";

export default async function UserPage() {
	const { user } = await validateRequest();

	if (!user) return redirect("/login");

	return (
		<section className="flex h-screen flex-col items-center justify-center gap-5 bg-red-900 px-5 py-20">
			<form method="GET">
				<div className="flex flex-col rounded-xl bg-amber-500 p-5">
					<h1 className="mx-auto text-3xl font-extrabold">HireHub</h1>
					<Image
						src={Pending}
						alt="Sign in Logo"
						width={350}
						height={350}
						sizes="100vw"
						priority
						className="mx-auto p-5"
					/>
					<div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-orange-300 p-5">
						<p className="w-96 text-center text-base font-bold leading-6 text-gray-900">
							Your account has been created. Please wait/contact an admin for account
							verification.
						</p>
					</div>
				</div>
			</form>
			<LogoutButton />
		</section>
	);
}
