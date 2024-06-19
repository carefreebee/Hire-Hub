export default function Header() {
	return (
		<header className="flex gap-5">
			<div className="h-20 w-20 rounded-full bg-slate-400"></div>
			<div className="flex flex-col justify-center">
				<div className="text-lg font-bold">John Doe</div>
				<small className="font-medium text-slate-600">Applicant</small>
			</div>
		</header>
	);
}
