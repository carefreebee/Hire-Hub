import Image from "next/image";
import LoginForm from "~/components/pages/login/LoginForm";
import signInLogo from "~/public/images/signIn-logo.png";

export default function Dashboard() {
	return (
		<div className="h-screen w-full lg:grid lg:grid-cols-2">
			<div className="flex items-center justify-center bg-amber-500 py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold text-white">HireHub</h1>
					</div>
					<LoginForm />
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src={signInLogo}
					alt="Sign in Logo"
					fill
					sizes="100vw"
					priority
					className="p-10"
				/>
			</div>
		</div>
	);
}
