import Link from "next/link";

export default function AddRequest() {
	return (
		<Link
			href={"/dashboard/request/add-new-request"}
			className="rounded-lg bg-[#7F0000] px-3.5 py-1.5 text-white hover:scale-95"
		>
			+Add New Request
		</Link>
	);
}
