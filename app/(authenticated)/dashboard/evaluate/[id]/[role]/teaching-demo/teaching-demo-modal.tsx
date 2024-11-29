"use client";
import { useRef, useState } from "react";
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
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { handleInsertForm } from "~/controller/RatingFormsController";
import { User } from "~/lib/schema";

interface TeachingDemoModalProps {
	applicantId: number | undefined;
	userId: string | undefined;
	evaluatedBy: User | undefined;
}

function TeachingDemoModal({ applicantId, userId, evaluatedBy }: TeachingDemoModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const sections = [
		{
			title: "A. PERSONALITY",
			items: [
				"Grooming is commendable.",
				"Voice modulation and proper pacing are observed.",
				"Composure, confidence and poise are well executed.",
				"Articulation and mastery of medium of instruction are demonstrated.",
				"Maintains good rapport with students.",
			],
		},
		{
			title: "B. PREPARATION",
			items: [
				"Instructional objectives for the session are evident.",
				"Board notes, sketches and diagrams are legible and well-organized.",
				"Appropriateness of visual aids, handouts and other teaching devices are observed.",
			],
		},
		{
			title: "C. TEACHING PROCESS",
			items: [
				"Motivational skills are demonstrated.",
				"Organizational / logical sequencing of topics is evident.",
				"Demonstrates mastery of the subject matter.",
				"Methodology, techniques or strategies are appropriate.",
				"Demonstrates ability to relate subject matters to other fields.",
			],
		},
		{
			title: "D. COMMUNICATION SKILLS",
			items: [
				"Pauses for questions, commands or directions.",
				"Uses language for a variety of purposes.",
				"Initiates questions to encourage discussion.",
				"Demonstrates appropriate sentence structure.",
				"Demonstrates adequate vocabulary.",
			],
		},
	];

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		formData.append("recruitment_stage", "Teaching Demo");

		console.log("Form data:", Object.fromEntries(formData.entries()));

		try {
			await handleInsertForm(formData, "teachingDemo");
			console.log("Form data submitted");
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Teaching Demo Submitted!",
				description: "The teaching demo form has been successfully submitted.",
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

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				<Button>Teaching Demo Form</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-8 p-4">
					<input type="hidden" name="applicantId" value={applicantId} />
					<input type="hidden" name="userId" value={userId} />
					<input
						type="hidden"
						name="evaluatedBy"
						value={evaluatedBy?.name ?? ""}
						readOnly
					/>
					<DialogHeader className="flex items-center">
						<DialogTitle>TEACHING DEMONSTRATION RATING SCALE</DialogTitle>
						<DialogDescription></DialogDescription>
						<div className="flex w-full flex-col items-center gap-4">
							<div className="flex w-full flex-col items-center justify-center gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div>Applicant&apos;s Name: </div>
									<Input
										name="applicantName"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8 w-96"
									/>
								</div>
							</div>

							<div className="flex w-full gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="flex w-full items-center gap-2 text-xs">
										<div>Topic: </div>
										<Input
											name="topic"
											type="text"
											minLength={2}
											maxLength={100}
											required
											className="h-8"
										/>
									</div>
									<div className="flex w-full items-center gap-2 text-xs">
										<div>Department/Office: </div>
										<Input
											name="departmentOffice"
											type="text"
											minLength={2}
											maxLength={100}
											required
											className="h-8"
										/>
									</div>
									<div>Date </div>
									<Input
										name="date"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8 w-24"
									/>
								</div>
							</div>
						</div>
					</DialogHeader>
					<div className="flex h-full w-full flex-col">
						<div className="mb-4 flex items-center justify-center bg-gray font-bold">
							JOB-FIT INTERVIEW
						</div>
						<div className="flex items-center justify-between">
							(1) Strongly Disagree: Considerable and urgent improvement needed.
							<div>(3) Agree: Meets the expectation with minor improvement.</div>
						</div>
						<div className="flex items-center justify-between">
							(2) Disagree: Major improvement is needed.
							<div>
								(4) Strongly Agree: Exceeds expectation with slight improvement.
							</div>
						</div>
						{sections.map((section, sectionIndex) => (
							<div key={sectionIndex}>
								<h2 className="mb-4 text-lg font-bold">{section.title}</h2>
								{section.items.map((item, itemIndex) => (
									<div
										key={itemIndex}
										className="mb-2 grid grid-cols-[auto_1fr_auto] items-center gap-x-4"
									>
										<span className="text-sm">{itemIndex + 1}.</span>
										<label className="flex-1 text-sm">{item}</label>
										<RadioGroup
											defaultValue={`rating-${sectionIndex}-${itemIndex}-1`}
											name={`rating-${sectionIndex}-${itemIndex}`}
										>
											<div className="flex w-56 justify-between">
												{[1, 2, 3, 4].map((rating) => (
													<div
														key={rating}
														className="flex items-center space-x-2"
													>
														<RadioGroupItem
															value={`rating-${sectionIndex}-${itemIndex}-${rating}`}
															id={`rating-${sectionIndex}-${itemIndex}-${rating}`}
														/>
														<Label
															htmlFor={`rating-${sectionIndex}-${itemIndex}-${rating}`}
														>
															{rating}
														</Label>
													</div>
												))}
											</div>
										</RadioGroup>
										<input
											type="hidden"
											name={`question-${sectionIndex}-${itemIndex}`}
											value={item}
										/>
									</div>
								))}
							</div>
						))}
						<div>
							<h2 className="mb-4 text-lg font-bold">Overall Rating</h2>
							<div className="grid grid-cols-[1fr_auto] items-center gap-x-4">
								<label className="flex-1 text-sm">
									Rate the overall performance:
								</label>
								<RadioGroup defaultValue="overall-rating-1" name="overall-rating">
									<div className="flex w-56 justify-between">
										{[1, 2, 3, 4].map((rating) => (
											<div
												key={rating}
												className="flex items-center space-x-2"
											>
												<RadioGroupItem
													value={`overall-rating-${rating}`}
													id={`overall-rating-${rating}`}
												/>
												<Label htmlFor={`overall-rating-${rating}`}>
													{rating}
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>

						<div className="mb-4 flex items-center justify-center bg-gray font-bold">
							Comments
						</div>

						<Textarea
							name="comments"
							className="h-24"
							placeholder="Enter comments here..."
						/>
						<Button type="submit" onClick={handleSubmit}>
							Submit
						</Button>
						<div className="flex flex-col">
							<div className="flex">
								Assessor:{" "}
								<div>
									{evaluatedBy?.name} | {evaluatedBy?.role}
								</div>
							</div>

							<div>Date: </div>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default TeachingDemoModal;
