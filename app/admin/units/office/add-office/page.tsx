import Previous from "~/components/pages/Previous";
import AddUnitComponent from "~/components/pages/admin/AddUnitComponent";

export default function AddNewRequestPage() {
	return (
		<div className="flex h-screen flex-col p-8">
			<Previous href="/admin/units/office" text="View all Office" />
			<AddUnitComponent
				headTitle="Add New Office"
				codeLabel="Office code"
				inputCode="office_code"
				fullLabel="Office Name"
				inputName="office_name"
			/>
		</div>
	);
}
