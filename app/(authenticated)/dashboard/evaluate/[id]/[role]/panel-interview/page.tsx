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

function PanelInterViewModal() {
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
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<DialogHeader className="flex items-center">
					<DialogTitle>TEACHING DEMONSTRATION RATING SCALE</DialogTitle>
					<DialogDescription></DialogDescription>
					<div className="flex w-full flex-col items-center gap-4">
						<div className="flex w-full flex-col items-center justify-center gap-2">
							<div className="flex w-full items-center gap-2 text-xs">
								<div>Applicant&apos;s Name: </div>
								<Input
									name="name"
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
								<div className="flex w-[60%] items-center gap-2 text-xs">
									<div>Position Applied: </div>
									<Input
										name="name"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
									/>
								</div>
								<div className="flex w-[60%] items-center gap-2 text-xs">
									<div>College: </div>
									<Input
										name="dept/office"
										type="text"
										minLength={2}
										maxLength={100}
										required
										className="h-8"
									/>
								</div>
								<div className="flex w-[60%] items-center gap-2 text-xs">
									<div>Department </div>
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
						</div>
					</div>
				</DialogHeader>
				<div className="flex h-full w-full flex-col">
					<form className="space-y-8 p-4">
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
									<RadioGroup className="flex w-full justify-between">
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
									<Input placeholder="Add comment" />
								</div>
							))}
						</div>
						<div>
							<h2 className="mb-2 text-sm font-bold">RECOMMENDATIONS</h2>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="unfavorable" className="w-64 text-sm">
									Unfavorable
								</Label>
								<Input />
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="comparison" className="w-64 text-sm">
									For Comparison with others
								</Label>
								<Input />
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="effective" className="w-64 text-sm">
									For hiring effective
								</Label>
								<Input />
							</div>
						</div>
					</form>

					<Button type="submit">Submit</Button>
					<div className="flex flex-col">
						<div>Interviewer: Random Name | Role</div>

						<div>Date: </div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default function PanelInterView() {
	return (
		<div>
			<PanelInterViewModal />
		</div>
	);
}
