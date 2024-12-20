import ViewResult from "~/components/pages/admin/ViewResult";
import { getOfficeByCode } from "~/controller/OfficeController";

export default async function SuccessAddNewRequestPage({ params }: { params: { code: string } }) {
	const office = await getOfficeByCode(params.code);

	return (
		<section className="py-10">
			<ViewResult
				href="/admin/units/office"
				title="Office Details"
				label="Office"
				unitCode={office?.office_code as string}
				unitName={office?.office_name as string}
			/>
		</section>
	);
}
