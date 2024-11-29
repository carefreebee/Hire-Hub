"use client";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

import { useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { handleInsertForm } from "~/controller/RatingFormsController";
import { User } from "~/lib/schema";
import { cultureAddQuestions } from "./cultureAddQuestions";
import { jobfitQuestions } from "./jobfitQuestions";

interface SelectedQuestions {
	[key: number]: string;
}

interface InitialInterviewModalProps {
	applicantId: number | undefined;
	userId: string | undefined;
	evaluatedBy: User | undefined;
}

function InitialInterviewModal({ applicantId, userId, evaluatedBy }: InitialInterviewModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const jobfit = [
		{ factor: "Experience", questions: jobfitQuestions.experienceQuestions },
		{ factor: "Competence", questions: jobfitQuestions.competenceQuestions },
		{ factor: "Contribution", questions: jobfitQuestions.contributionQuestions },
	];
	const cultureadd = [
		{ factor: "Culture of Excellence", questions: cultureAddQuestions.cultureofExcellence },
		{ factor: "Integrity", questions: cultureAddQuestions.integrityQuestions },
		{ factor: "Teamwork", questions: cultureAddQuestions.teamworkQuestions },
		{ factor: "Universality", questions: cultureAddQuestions.universalityQuestions },
	];
	const [cultureQuestions, setCultureQuestions] = useState<SelectedQuestions>({});
	const [jobFitQuestions, setJobFitQuestions] = useState<SelectedQuestions>({});

	const handleSelectChange = (index: number, value: string) => {
		setJobFitQuestions((prev) => ({ ...prev, [index]: value }));
	};

	const handleSelectChangeCulture = (index: number, value: string) => {
		setCultureQuestions((prev) => ({ ...prev, [index]: value }));
	};

	async function handleSubmit(): Promise<void> {
		const formData = new FormData(formRef.current!);
		formData.append("recruitment_stage", "Initial Interview");
		console.log("Form data:", Object.fromEntries(formData.entries()));

		try {
			await handleInsertForm(formData, "initialInterview");
			console.log("Form data submitted");
			if (formRef.current) {
				formRef.current.reset();
			}
			toast({
				title: "Initial Interview Submitted!",
				description: "The initial interview form has been successfully submitted.",
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
			<DialogTrigger asChild>
				<Button type="button">Initial Interview Form</Button>
			</DialogTrigger>

			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-8 p-4">
					<input type="hidden" name="applicantId" value={applicantId} readOnly />
					<input type="hidden" name="userId" value={userId} readOnly />
					<input
						type="hidden"
						name="evaluatedBy"
						value={evaluatedBy?.name ?? ""}
						readOnly
					/>
					<DialogHeader className="flex items-center">
						<DialogTitle>JOB-FIT & CULTURE-ADD INTERVIEW</DialogTitle>
						<DialogDescription>
							CIT-HRD-FRM-B003-V01 Job-Fit & Culture-Add Interview
						</DialogDescription>

						<div className="flex w-full items-center gap-64">
							<div className="flex w-full flex-col items-center justify-center gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="w-[60%]">Applicant&apos;s Name: </div>
									<Input
										name="applicantName"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
									/>
								</div>
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="w-[60%]">Position Desired: </div>
									<Input
										name="positionDesired"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
									/>
								</div>
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="w-[60%]">Department/Office: </div>
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

							<div className="flex w-full flex-col gap-2">
								<div className="flex w-full items-center justify-end gap-2 text-xs">
									<div className="w-[40%]">Job-Fit </div>
									<Input
										name="jobFit"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8 w-24"
									/>
								</div>
								<div className="flex w-full items-center justify-end gap-2 text-xs">
									<div className="w-[40%]">Culture-Add </div>
									<Input
										name="cultureAdd"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8 w-24"
									/>
								</div>
								<div className="flex w-full items-center justify-end gap-2 text-xs">
									<div className="w-[40%]">Initial Interview Rating </div>
									<Input
										name="initialInterviewRating"
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
						<table className="border-gray-300 mb-4 w-full table-auto border-collapse border text-left text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="border-gray-300 border px-4 py-2">Factor</th>
									<th className="border-gray-300 border px-4 py-2">Question</th>
									<th className="border-gray-300 border px-4 py-2">Response/s</th>
									<th className="border-gray-300 border px-4 py-2">Rating</th>
								</tr>
							</thead>
							<tbody>
								{jobfit.map((row, index) => (
									<tr key={index} className="border-b">
										<td className="border-gray-300 border px-4 py-2">
											{row.factor}
										</td>
										<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
											<Select
												onValueChange={(value) =>
													handleSelectChange(index, value)
												}
											>
												<SelectTrigger className="w-[200px]">
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent>
													{row.questions.map((question, qIndex) => (
														<SelectItem key={qIndex} value={question}>
															Question {qIndex + 1}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<Input
												type="text"
												name={`jobFitQuestion${index + 1}`}
												className="border-gray-300 h-auto w-[90%] text-wrap rounded border p-1"
												value={jobFitQuestions[index] || ""}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Input
												name={`jobFitResponse${index + 1}`}
												type="text"
												className="border-gray-300 w-[100%] rounded border p-1"
												placeholder="Your response"
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Select name={`jobFitRating${index + 1}`}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a rating" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="1">1</SelectItem>
													<SelectItem value="2">2</SelectItem>
													<SelectItem value="3">3</SelectItem>
													<SelectItem value="4">4</SelectItem>
													<SelectItem value="5">5</SelectItem>
												</SelectContent>
											</Select>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="mb-4 flex items-center justify-center bg-gray font-bold">
							CULTURE-ADD INTERVIEW
						</div>
						<table className="border-gray-300 mb-4 w-full table-auto border-collapse border text-left text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="border-gray-300 border px-4 py-2">Factor</th>
									<th className="border-gray-300 border px-4 py-2">Question</th>
									<th className="border-gray-300 border px-4 py-2">Response/s</th>
									<th className="border-gray-300 border px-4 py-2">Rating</th>
								</tr>
							</thead>
							<tbody>
								{cultureadd.map((row, index) => (
									<tr key={index} className="border-b">
										<td className="border-gray-300 border px-4 py-2">
											{row.factor}
										</td>
										<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
											<Select
												onValueChange={(value) =>
													handleSelectChangeCulture(index, value)
												}
											>
												<SelectTrigger className="w-[200px]">
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent>
													{row.questions.map((question, qIndex) => (
														<SelectItem key={qIndex} value={question}>
															Question {qIndex + 1}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<Input
												type="text"
												name={`cultureAddQuestion${index + 1}`}
												className="border-gray-300 h-auto w-[90%] text-wrap rounded border p-1"
												value={cultureQuestions[index] || ""}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Input
												name={`cultureAddResponse${index + 1}`}
												type="text"
												className="border-gray-300 w-[100%] rounded border p-1"
												placeholder="Your response"
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Select name={`cultureAddRating${index + 1}`}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a rating" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="1">1</SelectItem>
													<SelectItem value="2">2</SelectItem>
													<SelectItem value="3">3</SelectItem>
													<SelectItem value="4">4</SelectItem>
													<SelectItem value="5">5</SelectItem>
												</SelectContent>
											</Select>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<table className="border-gray-300 mb-4 w-full table-auto border-collapse border text-left text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="border-gray-300 border px-4 py-2">
										Consideration/s
									</th>
									<th className="border-gray-300 border px-4 py-2">Question/s</th>
									<th className="border-gray-300 border px-4 py-2">Response/s</th>
								</tr>
							</thead>
							<tbody>
								<td className="border-gray-300 border px-4 py-2">
									<Textarea
										name="considerations"
										placeholder="Type your message here."
									/>
								</td>
								<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
									<Textarea
										name="questions"
										placeholder="Type your message here."
									/>
								</td>
								<td className="border-gray-300 border px-4 py-2">
									<Textarea
										name="response"
										placeholder="Type your message here."
									/>
								</td>
							</tbody>
						</table>
						<div className="flex w-[95%] items-center justify-between">
							<div className="flex gap-2 self-start">
								Expected Monthly Salary:
								<Input
									type="text"
									className="border-gray-300 h-6 w-[15%] rounded border p-1"
									placeholder=""
									name="expectedMonthlySalary"
								/>
							</div>
							<div>
								Recommendations:
								<Textarea
									name="recommendations"
									placeholder="Type your message here."
									className="w-[350px]"
								/>
							</div>
						</div>
						<div className="flex flex-col">
							Evaluated by:
							<div className="flex gap-2">
								Interviewer&apos;s Name:
								<div className="bg-orange-300 font-bold">
									{evaluatedBy?.name} | {evaluatedBy?.role}
								</div>
							</div>
						</div>

						<Button type="submit" onClick={handleSubmit}>
							Submit
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default InitialInterviewModal;
