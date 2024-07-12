import EditOffice from "~/components/pages/authenticated/admin/edit-office/EditOffice";
import Previous from "~/components/pages/Previous";
import { getOfficeById } from "~/controller/DepartmentOrOfficeController";

export default async function SuccessAddNewRequestPage({ params }: { params: { id: string } }) {
	const office = await getOfficeById(Number(params.id));

	return (
		<>
			<Previous href="/admin/units/office" text="View All Units" />
			<EditOffice
				unitId={String(office?.office_id)}
				unitName={office?.office_name as string}
			/>
		</>
	);
}
