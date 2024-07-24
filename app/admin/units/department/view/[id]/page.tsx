import ViewResult from "~/components/pages/admin/ViewResult";
import { getDepartmentById } from "~/Controller/DepartmentController";

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
