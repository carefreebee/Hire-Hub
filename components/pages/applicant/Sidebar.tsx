import ApplicationStatus from "../../sidebar/ApplicationStatus";
import Header from "../../sidebar/Header";

export default function Sidebar() {
	return (
		<aside className="w-[361px] rounded-md border-2 p-5">
			<Header />
			<div className="mb-5 mt-10 px-3">
				<h2 className="mb-4 font-semibold">Application Status</h2>
				<ApplicationStatus />
			</div>
		</aside>
	);
}
