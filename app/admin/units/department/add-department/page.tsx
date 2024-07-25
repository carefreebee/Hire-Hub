import Previous from "~/components/pages/Previous";
import AddUnitComponent from "~/components/pages/admin/AddUnitComponent";

export default function AddNewRequestPage() {
	return (
		<div className="flex h-screen flex-col p-8">
			<Previous href="/admin/units/department" text="View all Department" />
			<AddUnitComponent
				headTitle="Add New Department"
				codeLabel="Department code"
				inputCode="department_code"
				fullLabel="Department Name"
				inputName="department_name"
			/>
		</div>
	);
}
