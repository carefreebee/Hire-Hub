import ViewResult from "~/components/pages/authenticated/admin/ViewResult";
import { getDepartmentById } from "~/controller/DepartmentOrOfficeController";

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const department = await getDepartmentById(Number(params.id));

	return (
		<ViewResult
			href="/admin/units/department"
			title="Department Details"
			label="Department Name"
			unitName={department?.department_name as string}
		/>
	);
}
