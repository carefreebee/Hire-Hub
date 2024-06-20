import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const SuccessAddNewRequestPage = ({ params }: { params: { id: string } }) => {
	return (
		<section className="bg-slate-200/30">
			<section className="py-10">
				<div className="mx-auto flex h-[895px] w-[686px] flex-col justify-center gap-8 rounded-xl bg-white shadow-md">
					<h4 className="scroll-m-20 text-center text-xl font-bold tracking-tight text-[#7F0000]">
						Request Details
					</h4>
					<div className="mx-auto w-[564px]">
						<LabelTag label="Requested Position" />
						<Input value={"IT/CS Faculty"} readOnly className="border-2" />
					</div>

					<div className="mx-auto w-[564px]">
						<LabelTag label="Request Date" />
						<Input value={"21039123/12312314/12321312"} readOnly className="border-2" />
					</div>

					<div className="mx-auto w-[564px]">
						<LabelTag label="Type" />
						<Input value={"Type O"} readOnly className="border-2" />
					</div>

					<div className="mx-auto w-[564px]">
						<LabelTag label="Department" />
						<Input value={"Department"} readOnly className="border-2" />
					</div>

					<div className="mx-auto grid w-[564px] gap-1.5">
						<LabelTag label="Description" />
						<Textarea
							value="This is a description of the job."
							readOnly
							className="border-2"
						/>
					</div>

					<div className="mx-auto grid w-[564px] gap-1.5">
						<LabelTag label="Qualification" />
						<Textarea
							value="This is a description of the job."
							readOnly
							className="border-2"
						/>
					</div>
				</div>
			</section>
		</section>
	);
};

function LabelTag({ label }: { label: string }) {
	return <Label className="font-semibold text-[#666666]">{label}</Label>;
}

export default SuccessAddNewRequestPage;
