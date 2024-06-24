import Previous from "~/components/pages/Previous";
import Form from "~/components/pages/authenticated/add-new-request/Form";

export default function AddNewRequestPage() {
	return (
		<section className="bg-slate-200/30">
			<div className="flex flex-col py-10">
				<Previous text="View all Request" />
				<Form />
			</div>
		</section>
	);
}
