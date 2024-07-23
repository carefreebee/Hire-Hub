import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Previous from "../Previous";

type ViewResultProps = {
	href: string;
	title: string;
	label: string;
	unitName: string;
};

export default function ViewResult({ href, title, label, unitName }: ViewResultProps) {
	return (
		<section className="flex h-screen flex-col">
			<Previous href={href} text="View all Department" />
			<section className="py-10">
				<div className="mx-auto flex w-[686px] flex-col justify-center gap-8 rounded-xl bg-white py-10 shadow-md">
					<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
						{title}
					</h4>
					<div className="mx-auto w-[564px]">
						<Label className="font-semibold text-[#666666]">{label}</Label>
						<Input value={unitName} readOnly className="border-2" />
					</div>
				</div>
			</section>
		</section>
	);
}
