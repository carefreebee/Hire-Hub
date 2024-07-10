import Previous from "~/components/pages/Previous";
import AddUnitComponent from "~/components/pages/authenticated/admin/AddUnitComponent";

export default function AddNewRequestPage() {
	return (
		<div className="flex h-screen flex-col">
			<Previous href="/admin/units/office" text="View all Office" />
			<AddUnitComponent
				headTitle="Add New Office"
				label="Requested Office"
				inputName="office_name"
			/>
		</div>
	);
}
