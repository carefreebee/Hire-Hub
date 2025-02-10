"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/components/ui/use-toast";
import { handleInsertForm } from "~/controller/RatingFormsController";
import { ApplicantSelect, User } from "~/lib/schema";

interface InitialInterviewModalProps {
	applicant: ApplicantSelect | undefined;
	userId: string | undefined;
	evaluatedBy: User | undefined;
}

function PanelInterViewModal({ applicant, userId, evaluatedBy }: InitialInterviewModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const factors = [
		"Appearance and mannerisms",
		"Manner of speaking",
		"Physical condition",
		"Ability to grasp ideas quickly",
		"Ability to organize ideas",
		"Ability to get along with others",
		"Self-confidence / initiative and self-assertion",
		"Reasoning and judgment",
		"Possesses a high degree of emotional stability and maturity",
		"Experience in work applied for",
	];

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		formData.append("recruitment_stage", "Panel Interview");
		console.log("Form data:", Object.fromEntries(formData.entries()));

		try {
			await handleInsertForm(formData, "panelInterview");
			console.log("Form data submitted");
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Panel Interview Submitted!",
				description: "The Panel Interview form has been successfully submitted.",
			});
			setIsOpen(false);
		} catch (error) {
			console.error("Error submitting form:", error);
			toast({
				title: "Submission Failed",
				description: "There was an error submitting the form.",
			});
		}
	}

	useEffect(() => {
		setFactorAverage([]);
	}, [isOpen]);
	const [factorAverage, setFactorAverage] = useState<number[]>([]);
	const handleRadioGroupValueChange = (value: number, index: number) => {
		const updatedFactorAverage = [...factorAverage];
		updatedFactorAverage[index - 1] = value;
		setFactorAverage(updatedFactorAverage);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				<Button>Panel Interview Form</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-8 p-4">
					<input type="hidden" name="applicantId" value={applicant?.id} />
					<input type="hidden" name="userId" value={userId} />
					<input
						type="hidden"
						name="evaluatedBy"
						value={evaluatedBy?.name ?? ""}
						readOnly
					/>
					<DialogHeader className="flex items-center">
						<DialogTitle>PANEL INTERVIEW RATING SCALE</DialogTitle>
						<DialogDescription></DialogDescription>
						<div className="flex w-full flex-col items-center gap-4">
							<div className="flex w-full items-center justify-center gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div>Applicant&apos;s Name: </div>
									<Input
										value={`${applicant?.first_name} ${applicant?.last_name}`}
										name="applicantName"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
										readOnly
									/>
								</div>
								<div className="flex w-[50%] items-center gap-2 text-xs">
									<div>Factors: </div>
									<Input
										readOnly
										value={(
											factorAverage.reduce((acc, value) => acc + value, 0) /
											factors.length
										).toFixed(2)}
										name="factors"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
									/>
								</div>
							</div>

							<div className="flex w-full gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>Position Applied: </div>
										<Input
											value={applicant?.position_applied}
											name="positionApplied"
											type="text"
											minLength={2}
											maxLength={100}
											required
											className="h-8"
											readOnly
										/>
									</div>
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>College: </div>
										<Input
											value={applicant?.selected_department || ""}
											name="college"
											type="text"
											minLength={2}
											maxLength={100}
											required
											className="h-8"
											readOnly
										/>
									</div>
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>Department </div>
										<Input
											name="departmentOffice"
											type="text"
											minLength={2}
											maxLength={100}
											required
											className="h-8"
										/>
									</div>
								</div>
							</div>
						</div>
					</DialogHeader>
					<div className="flex h-full w-full flex-col">
						<div>
							<div className="mb-4 grid grid-cols-[2fr_3fr_1fr] items-center gap-x-4 border-b pb-2 text-sm font-bold">
								<span>FACTORS</span>
								<span className="text-center">RATING SCALE</span>
								<span>COMMENTS</span>
							</div>
							{factors.map((factor, index) => (
								<div
									key={index}
									className="mb-2 grid grid-cols-[2fr_3fr_1fr] items-center gap-x-4"
								>
									<span className="text-sm">
										{index + 1}. {factor}
									</span>
									<RadioGroup
										onValueChange={(value) =>
											handleRadioGroupValueChange(
												parseInt(value, 10),
												index + 1
											)
										}
										name={`rating-${index}`}
										className="flex w-full justify-between"
									>
										{[1, 2, 3, 4, 5].map((rating) => (
											<Label
												key={rating}
												className="flex items-center space-x-1"
											>
												<RadioGroupItem value={rating.toString()} />
												<span className="text-sm">{rating}</span>
											</Label>
										))}
									</RadioGroup>
									<Input name={`comment-${index}`} placeholder="Add comment" />
								</div>
							))}
						</div>
						<div>
							<h2 className="mb-2 text-sm font-bold">RECOMMENDATIONS</h2>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="unfavorable" className="w-64 text-sm">
									Unfavorable
								</Label>
								<Input name="unfavorable" />
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="comparison" className="w-64 text-sm">
									For Comparison with others
								</Label>
								<Input name="comparison" />
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="effective" className="w-64 text-sm">
									For hiring effective
								</Label>
								<Input name="effective" />
							</div>
						</div>
						<div className="flex flex-col">
							<div>
								Interviewer:{" "}
								<div className="bg-orange-300 font-bold">
									{evaluatedBy?.name} | {evaluatedBy?.role}
								</div>
							</div>
							<div>Date: </div>
							<Button type="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default PanelInterViewModal;
