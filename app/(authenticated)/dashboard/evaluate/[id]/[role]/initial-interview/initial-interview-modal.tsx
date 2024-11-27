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
import { Textarea } from "~/components/ui/textarea";

function InitialInterviewModal() {
	const jobfit = [{ factor: "Experience" }, { factor: "Competence" }, { factor: "Contribution" }];
	const cultureadd = [
		{ factor: "Culture of Excellence" },
		{ factor: "Integrity" },
		{ factor: "Teamwork" },
		{ factor: "Universality" },
	];

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Initial Interview Form</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
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
									name="name"
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
									name="name"
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
									name="dept/office"
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
									name="dept/office"
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
									name="dept/office"
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
									name="dept/office"
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
										<select className="border-gray-300 w-[20%] rounded border p-1">
											<option>Select</option>
											<option>Question 1</option>
											<option>Question 2</option>
										</select>
										<Input
											type="text"
											className="border-gray-300 h-auto w-[90%] text-wrap rounded border p-1"
											placeholder=""
											readOnly
										/>
									</td>
									<td className="border-gray-300 border px-4 py-2">
										<Input
											type="text"
											className="border-gray-300 w-[100%] rounded border p-1"
											placeholder=""
										/>
									</td>
									<td className="border-gray-300 border px-4 py-2">
										<select className="border-gray-300 w-full rounded border p-1">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
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
										<select className="border-gray-300 w-[20%] rounded border p-1">
											<option>Select</option>
											<option>Question 1</option>
											<option>Question 2</option>
										</select>
										<Input
											type="text"
											className="border-gray-300 h-auto w-[90%] text-wrap rounded border p-1"
											placeholder=""
											readOnly
										/>
									</td>
									<td className="border-gray-300 border px-4 py-2">
										<Input
											type="text"
											className="border-gray-300 w-[100%] rounded border p-1"
											placeholder=""
										/>
									</td>
									<td className="border-gray-300 border px-4 py-2">
										<select className="border-gray-300 w-full rounded border p-1">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
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
								<Textarea placeholder="Type your message here." />
							</td>
							<td className="border-gray-300 flex items-center space-x-2 border px-4 py-2">
								<Textarea placeholder="Type your message here." />
							</td>
							<td className="border-gray-300 border px-4 py-2">
								<Textarea placeholder="Type your message here." />
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
							/>
						</div>
						<div>
							Recommendations:
							<Textarea placeholder="Type your message here." className="w-[350px]" />
						</div>
					</div>
					<div className="flex flex-col">
						Evaluated by:
						<div>Interviewer&apos;s Name: Random Name | Role</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default InitialInterviewModal;
