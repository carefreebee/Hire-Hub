import EditDepartment from "~/components/pages/authenticated/admin/edit-department/EditDepartment";
import Previous from "~/components/pages/Previous";
import { getDepartmentById } from "~/controller/DepartmentOrOfficeController";

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const department = await getDepartmentById(Number(params.id));

	return (
		<>
			<Previous href="/admin/units/department" text="Units" />
			<EditDepartment
				unitId={String(department?.department_id)}
				unitName={department?.department_name as string}
			/>
		</>
	);
}
