import Previous from "~/components/pages/Previous";
import AssessorHeader from "~/components/pages/applicant/AssessorHeader";
import Sidebar from "~/components/pages/applicant/Sidebar";

type LayoutProps = {
	children: React.ReactNode;
	params: { id: string };
};

export default function Layout({ children, params }: LayoutProps) {
	return (
		<section className="mx-auto flex max-w-[1400px] flex-col gap-5 p-5">
			<Previous href="/dashboard/applicant" text="View all Applicants" />
			<div className="flex gap-5">
				<Sidebar id={params.id} />
				<section className="w-[960px]">
					<AssessorHeader id={params.id} />
					{children}
					{/* <Comments applicantId={params.id as string} evaluatorsId={user?.id as string} /> */}
				</section>
			</div>
		</section>
	);
}
