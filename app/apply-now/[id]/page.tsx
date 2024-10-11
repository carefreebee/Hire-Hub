import { Card } from "~/components/ui/card";
import Application from "~/components/pages/applicant/Applications";

type PageProps = {
	params: { id: number };
};
export default async function ApplyNow({ params }: PageProps) {
	return (
		<Card className="h-[681[px] shadow-applicant-form mx-auto my-8 w-[1155px] gap-10 rounded-[50px] bg-white px-24 py-14 text-white">
			<Application params={params} />
		</Card>
	);
}
