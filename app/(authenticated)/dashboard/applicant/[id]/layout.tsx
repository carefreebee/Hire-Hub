import Previous from "~/components/pages/Previous";
import HrPageFooter from "~/components/pages/applicant/HrPageFooter";
import HrPageHeader from "~/components/pages/applicant/HrPageHeader";
import Sidebar from "~/components/pages/applicant/Sidebar";

export default function layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	return (
		<section className="mx-auto flex max-w-[1400px] flex-col gap-5 p-5">
			<Previous text="View all Applicants" />
			<div className="flex gap-5">
				<Sidebar id={params.id} />
				<section className="w-[960px]">
					<HrPageHeader id={params.id} />
					{children}
					<HrPageFooter />
				</section>
			</div>
		</section>
	);
}
