import Sidebar from "~/components/Sidebar";
import HrPageFooter from "~/components/pages/HrPageFooter";
import HrPageHeader from "~/components/pages/HrPageHeader";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="mx-auto flex max-w-[1400px] gap-5 py-5">
			<Sidebar />
			<section className="w-[960px]">
				<HrPageHeader />
				{children}
				<HrPageFooter />
			</section>
		</section>
	);
}
