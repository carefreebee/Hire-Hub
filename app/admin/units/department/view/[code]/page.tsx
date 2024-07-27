import ViewResult from "~/components/pages/admin/ViewResult";
import { getDepartmentByCode } from "~/Controller/DepartmentController";

export default async function SuccessAddNewRequestPage({ params }: { params: { code: string } }) {
	const department = await getDepartmentByCode(params.code);

	return (
		<section className="py-10">
			<ViewResult
				href="/admin/units/department"
				title="Department Details"
				label="Department"
				unitCode={department?.department_code as string}
				unitName={department?.department_name as string}
			/>
		</section>
	);
}
