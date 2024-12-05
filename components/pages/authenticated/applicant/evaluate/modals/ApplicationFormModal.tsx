"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import PageFive from "./Pages/PageFive";
import PageFour from "./Pages/PageFour";
import PageOne from "./Pages/PageOne";
import PageSeven from "./Pages/PageSeven";
import PageSix from "./Pages/PageSix";
import PageThree from "./Pages/PageThree";
import PageTwo from "./Pages/PageTwo";

interface ApplicationFormProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
}

export default function ApplicationFormModal({ isOpen, onClose, data }: ApplicationFormProps) {
	const [step, setStep] = useState<number>(1);
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<DialogHeader className="flex items-center">
					<DialogTitle>APPLICATION EMPLOYMENT FORM</DialogTitle>
				</DialogHeader>

				<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<input type="hidden" name="applicantId" value={data.applicant_id} readOnly />
					<input type="hidden" name="userId" value={data.user_id} readOnly />
					<div className="flex w-full items-center justify-around">
						<div className="flex text-sm">
							Position Applied:
							<Input
								className="h-7"
								name="positionApplied"
								readOnly
								value={data.rate.position}
							/>
						</div>
						<div className="flex text-sm">
							College / Department:
							<Input
								className="h-7"
								name="collegeDept"
								readOnly
								value={data.rate.department}
							/>
						</div>
						<div className="mb-14 flex h-32 w-32 border-2 text-sm">
							<Image src={data.rate.picture} alt="profile" width={300} height={100} />
						</div>
					</div>
					<PageOne data={data} visible={step === 1} />
					<PageTwo data={data} visible={step === 2} />
					<PageThree data={data} visible={step === 3} />
					<PageFour data={data} visible={step === 4} />
					<PageFive data={data} visible={step === 5} />
					<PageSix data={data} visible={step === 6} />
					<PageSeven data={data} visible={step === 7} />

					<div className="mt-4 flex items-center justify-center gap-2">
						<Button
							type="button"
							onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
							disabled={step === 1}
						>
							Previous
						</Button>
						Page {step} of 7
						<Button
							type="button"
							onClick={() => setStep((prev) => Math.min(prev + 1, 7))}
							disabled={step === 7}
						>
							Next
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
