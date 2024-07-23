import Previous from "~/components/pages/Previous";
import AddUnitComponent from "~/components/pages/admin/AddUnitComponent";

export default function AddNewRequestPage() {
	return (
		<div className="flex h-screen flex-col">
			<Previous href="/admin/units/department" text="View all Department" />
			<AddUnitComponent
				headTitle="Add New Department"
				label="Requested Department"
				inputName="department_name"
			/>
		</div>
	);
}
