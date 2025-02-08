"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { handleInsertForm } from "~/controller/RatingFormsController";
import { GetCurrentStage } from "~/util/get-current-stage";
import PageFive from "../../Pages/PageFive";
import PageFour from "../../Pages/PageFour";
import PageOne from "../../Pages/PageOne";
import PageSeven from "../../Pages/PageSeven";
import PageSix from "../../Pages/PageSix";
import PageThree from "../../Pages/PageThree";
import PageTwo from "../../Pages/PageTwo";
import PictureUpload from "../../Pages/PictureUpload";

export default function ApplicationForm() {
	const [step, setStep] = useState<number>(1);
	const [applicant, setApplicant] = useState<any>(null);
	const params = useParams<{ applicantId: string; userId: string }>();
	const [applicantStage, setApplicantStage] = useState<any>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [pictureUrl, setPictureUrlOther] = useState<string | null>(null);
	const router = useRouter();
	async function fetchApplicantStage() {
		const { applicant, applicantStage } = await GetCurrentStage(
			Number(params.applicantId),
			"psychological_exam"
		);
		setApplicant(applicant);
		setApplicantStage(applicantStage);
	}

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		formData.append("recruitment_stage", "Application for Employment");
		formData.append("picture", pictureUrl!);
		console.log("Form data:", Object.fromEntries(formData.entries()));

		try {
			await handleInsertForm(formData, "applicationInterviewForm");
			console.log("Form data submitted");
			router.push("/");
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Application for Employment Form Submitted!",
				description: "The Application for Employment Form has been successfully submitted.",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
			toast({
				title: "Submission Failed",
				description: "There was an error submitting the form.",
			});
		}
	}

	useEffect(() => {
		fetchApplicantStage();
	}, []);

	return (
		<div className="flex h-[100%] min-w-[60%] flex-col overflow-auto p-8">
			<div className="flex w-full items-center justify-center">
				<div className="text-2xl font-bold">APPLICATION EMPLOYMENT FORM</div>
			</div>
			<form ref={formRef} onSubmit={(e) => e.preventDefault()}>
				<input type="hidden" name="applicantId" value={applicant?.id} readOnly />
				<input type="hidden" name="userId" value={params.userId} readOnly />
				<div className="flex w-full items-center justify-around">
					<div className="flex text-sm">
						Position Applied:
						<Input
							disabled
							value={applicant?.position_applied}
							className="h-7"
							name="positionApplied"
						/>
					</div>
					<div className="flex text-sm">
						College / Department:
						<Input
							disabled
							value={applicant?.selected_department}
							className="h-7"
							name="collegeDept"
						/>
					</div>
					<div className="mb-14 flex h-32 w-32 border-2 text-sm">
						<PictureUpload
							setPictureUrlOther={setPictureUrlOther}
							formData={new FormData()}
						/>
					</div>
				</div>
				<PageOne visible={step === 1} applicant={applicant}/>
				<PageTwo visible={step === 2} />
				<PageThree visible={step === 3} />
				<PageFour visible={step === 4} />
				<PageFive visible={step === 5} />
				<PageSix visible={step === 6} />
				<PageSeven visible={step === 7} />

				{step === 7 && (
					<Button type="submit" onClick={handleSubmit} className="w-full">
						Submit
					</Button>
				)}
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
		</div>
	);
}
