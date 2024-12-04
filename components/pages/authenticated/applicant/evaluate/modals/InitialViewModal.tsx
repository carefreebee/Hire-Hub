"use client";
import { useRef } from "react";
import { cultureAddQuestions } from "~/app/(authenticated)/dashboard/evaluate/[id]/[role]/initial-interview/cultureAddQuestions";
import { jobfitQuestions } from "~/app/(authenticated)/dashboard/evaluate/[id]/[role]/initial-interview/jobfitQuestions";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

interface InitialInterviewViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
}

function InitialInterviewViewModal({ isOpen, onClose, data }: InitialInterviewViewModalProps) {
	const formRef = useRef<HTMLFormElement>(null);

	const jobfit = [
		{ factor: "Experience", questions: jobfitQuestions.experienceQuestions },
		{ factor: "Competence", questions: jobfitQuestions.competenceQuestions },
		{ factor: "Contribution", questions: jobfitQuestions.contributionQuestions },
	];
	const cultureAdd = [
		{ factor: "Culture of Excellence", questions: cultureAddQuestions.cultureOfExcellence },
		{ factor: "Integrity", questions: cultureAddQuestions.integrity },
		{ factor: "Teamwork", questions: cultureAddQuestions.teamwork },
		{ factor: "Universality", questions: cultureAddQuestions.universality },
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} className="space-y-8 p-4">
					<input type="hidden" name="userId" value={data.rate.userId} readOnly />
					<input
						type="hidden"
						name="evaluatedBy"
						value={data.rate.evaluatedBy}
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
										value={data.rate.applicantName}
										readOnly
										className="h-8"
									/>
								</div>
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="w-[60%]">Position Desired: </div>
									<Input
										name="positionDesired"
										type="text"
										value={data.rate.positionDesired}
										readOnly
										className="h-8"
									/>
								</div>
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="w-[60%]">Department/Office: </div>
									<Input
										name="departmentOffice"
										type="text"
										value={data.rate.departmentOffice}
										readOnly
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
										value={data.rate.jobFitRating}
										readOnly
										className="h-8 w-24"
									/>
								</div>
								<div className="flex w-full items-center justify-end gap-2 text-xs">
									<div className="w-[40%]">Culture-Add </div>
									<Input
										name="cultureAdd"
										type="text"
										value={data.rate.cultureAddQuestionsRating}
										readOnly
										className="h-8 w-24"
									/>
								</div>
								<div className="flex w-full items-center justify-end gap-2 text-xs">
									<div className="w-[40%]">Initial Interview Rating </div>
									<Input
										name="initialInterviewRating"
										type="text"
										value={data.rate.initialInterviewRating}
										readOnly
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
											<Select disabled>
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
												value={
													data.rate.jobFit?.[row.factor.toLowerCase()]
														.question || ""
												}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Input
												name={`jobFitResponse${index + 1}`}
												type="text"
												className="border-gray-300 w-[100%] rounded border p-1"
												value={
													data.rate.jobFit?.[row.factor.toLowerCase()]
														.response || ""
												}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Select name={`jobFitRating${index + 1}`} disabled>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={
															data.rate.jobFit?.[
																row.factor.toLowerCase()
															].rating
														}
													/>
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
								{cultureAdd.map((row, index) => (
									<tr key={index} className="border-b">
										<td className="border-gray-300 border px-4 py-2">
											{row.factor}
										</td>
										<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
											<Select disabled>
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
												value={
													data.rate.cultureAdd?.[
														row.factor === "Culture of Excellence"
															? "cultureOfExcellence"
															: row.factor.toLowerCase()
													]?.question || ""
												}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Input
												name={`cultureAddResponse${index + 1}`}
												type="text"
												className="border-gray-300 w-[100%] rounded border p-1"
												value={
													data.rate.cultureAdd?.[
														row.factor === "Culture of Excellence"
															? "cultureOfExcellence"
															: row.factor.toLowerCase()
													]?.response || ""
												}
												readOnly
											/>
										</td>
										<td className="border-gray-300 border px-4 py-2">
											<Select name={`cultureAddRating${index + 1}`} disabled>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={
															data.rate.cultureAdd?.[
																row.factor ===
																"Culture of Excellence"
																	? "cultureOfExcellence"
																	: row.factor.toLowerCase()
															]?.rating
														}
													/>
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
										value={data.rate?.considerations}
										readOnly
									/>
								</td>
								<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
									<Textarea
										name="questions"
										placeholder="Type your message here."
										value={data.rate?.questions}
										readOnly
									/>
								</td>
								<td className="border-gray-300 border px-4 py-2">
									<Textarea
										name="response"
										placeholder="Type your message here."
										value={data.rate?.response}
										readOnly
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
									value={data.rate?.expectedMonthlySalary}
									readOnly
								/>
							</div>
							<div>
								Recommendations:
								<Textarea
									name="recommendations"
									placeholder="Type your message here."
									className="w-[350px]"
									value={data.rate?.recommendations}
									readOnly
								/>
							</div>
						</div>
						<div className="flex flex-col">
							<div className="flex gap-2">
								Interviewer&apos;s Name:
								<div className="bg-orange-300 font-bold">
									{data.rate.evaluatedBy} | {data.rate.evaluatedBy?.role}
								</div>
							</div>
						</div>

						<Button onClick={onClose}>Close</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default InitialInterviewViewModal;
