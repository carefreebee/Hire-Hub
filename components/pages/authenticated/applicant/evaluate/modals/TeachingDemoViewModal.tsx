"use client";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";

interface TeachingDemoViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
}
function TeachingDemoViewModal({ isOpen, onClose, data }: TeachingDemoViewModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	console.log(data);

	const sections = [
		{
			title: "A. PERSONALITY",
			key: "personality",
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
			key: "preparation",
			items: [
				"Instructional objectives for the session are evident.",
				"Board notes, sketches and diagrams are legible and well-organized.",
				"Appropriateness of visual aids, handouts and other teaching devices are observed.",
			],
		},
		{
			title: "C. TEACHING PROCESS",
			key: "teachingProcess",
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
			key: "communicationSkills",
			items: [
				"Pauses for questions, commands or directions.",
				"Uses language for a variety of purposes.",
				"Initiates questions to encourage discussion.",
				"Demonstrates appropriate sentence structure.",
				"Demonstrates adequate vocabulary.",
			],
		},
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-8 p-4">
					<input type="hidden" name="applicantId" value={data.rate.applicantId} />
					<input type="hidden" name="userId" value={data.rate.userId} />
					<input
						type="hidden"
						name="evaluatedBy"
						value={data.rate.evaluatedBy}
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
										value={data.rate.applicantName}
										readOnly
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
											value={data.rate.topic}
											readOnly
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
											value={data.rate.departmentOffice}
											readOnly
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
										value={data.rate.date}
										readOnly
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
															checked={
																data.rate.sections?.[section.key][
																	`question${itemIndex + 1}`
																].rating === rating
															}
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
								<RadioGroup defaultValue="overall-rating-1" name="overAll">
									<div className="flex w-56 justify-between">
										{[1, 2, 3, 4].map((rating) => (
											<div
												key={rating}
												className="flex items-center space-x-2"
											>
												<RadioGroupItem
													value={`overall-rating-${rating}`}
													id={`overall-rating-${rating}`}
													checked={
														data.rate.overAll === rating.toString()
													}
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
							readOnly
							value={data.rate.comments}
						/>
						<div className="flex flex-col">
							<div>Date: {data.rate.date}</div>
							<Button onClick={onClose}>Close</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default TeachingDemoViewModal;
