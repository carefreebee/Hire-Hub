import EditOffice from "~/components/pages/admin/edit-office/EditOffice";
import Previous from "~/components/pages/Previous";
import { getOfficeByCode } from "~/controller/OfficeController";

export default async function SuccessAddNewRequestPage({ params }: { params: { code: string } }) {
	const office = await getOfficeByCode(params.code);

	return (
		<div className="h-screen py-10">
			<Previous href="/admin/units/office" text="View All Units" />
			<EditOffice
				unitId={String(office?.office_id)}
				unitCode={office?.office_code as string}
				unitName={office?.office_name as string}
			/>
		</div>
	);
}
