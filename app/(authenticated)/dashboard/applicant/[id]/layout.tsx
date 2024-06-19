import Sidebar from "~/components/Sidebar";
import HrPageFooter from "~/components/pages/applicant/HrPageFooter";
import HrPageHeader from "~/components/pages/applicant/HrPageHeader";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<section className="mx-auto flex max-w-[1400px] gap-5 py-5">
				<Sidebar />
				<section className="w-[960px]">
					<HrPageHeader />
					{children}
					<HrPageFooter />
				</section>
			</section>
		</div>
	);
}
