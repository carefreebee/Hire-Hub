import Previous from "~/components/pages/Previous";
import Form from "~/components/pages/authenticated/admin/add-new-request/Form";

export default function AddNewRequestPage() {
	return (
		<div className="flex flex-col">
			<Previous href="/admin/unit" text="View all Request" />
			<Form />
		</div>
	);
}
