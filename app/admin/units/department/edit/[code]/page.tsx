import EditDepartment from "~/components/pages/admin/edit-department/EditDepartment";
import Previous from "~/components/pages/Previous";
import { getDepartmentByCode } from "~/Controller/DepartmentController";

export default async function SuccessAddNewRequestPage({ params }: { params: { code: string } }) {
	const department = await getDepartmentByCode(params.code);

	return (
		<div className="h-screen py-10">
			<Previous href="/admin/units/department" text="View all Units" />
			<EditDepartment
				unitId={String(department?.department_id)}
				unitCode={department?.department_code as string}
				unitName={department?.department_name as string}
			/>
		</div>
	);
}
