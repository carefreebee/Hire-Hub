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
interface PanelInterviewViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
}

function PanelInterViewModal({ isOpen, onClose, data }: PanelInterviewViewModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
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

	const getFactorKey = (factor: string) => {
		if (factor === "Possesses a high degree of emotional stability and maturity") {
			return "emotionalstabilityandmaturity";
		}
		return factor.toLowerCase().replace(/[^a-z]/g, "");
	};

	

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex h-[95%] min-w-[60%] flex-col overflow-auto">
				<form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-8 p-4">
					<DialogHeader className="flex items-center">
						<DialogTitle>PANEL INTERVIEW RATING SCALE</DialogTitle>
						<DialogDescription></DialogDescription>
						<div className="flex w-full flex-col items-center gap-4">
							<div className="flex w-full items-center justify-center gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div>Applicant&apos;s Name: </div>
									<Input
										value={data.rate.applicantName}
										name="applicantName"
										type="text"
										minLength={2}
										maxLength={100}
										className="h-8"
										disabled
									/>
								</div>
								<div className="flex w-[50%] items-center gap-2 text-xs">
									<div>Factors: </div>
									<Input
										readOnly
										value={0}
										name="factors"
										type="text"
										minLength={2}
										maxLength={100}
										disabled
										className="h-8"
									/>
								</div>
							</div>

							<div className="flex w-full gap-2">
								<div className="flex w-full items-center gap-2 text-xs">
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>Position Applied: </div>
										<Input
											value={data.rate.position}
											name="positionApplied"
											type="text"
											minLength={2}
											maxLength={100}
											disabled
											className="h-8"
										/>
									</div>
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>College: </div>
										<Input
											value={data.rate.college}
											name="college"
											type="text"
											minLength={2}
											maxLength={100}
											disabled
											className="h-8"
										/>
									</div>
									<div className="flex w-[60%] items-center gap-2 text-xs">
										<div>Department </div>
										<Input
											value={data.rate.department}
											name="departmentOffice"
											type="text"
											minLength={2}
											maxLength={100}
											disabled
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
							{factors.map((factor, index) => {
								const key = getFactorKey(factor);
								const section = data.rate.sections?.[key];
								console.log(`Factor: ${factor}, Key: ${key}, Section:`, section);

								return (
									<div
										key={index}
										className="mb-2 grid grid-cols-[2fr_3fr_1fr] items-center gap-x-4"
									>
										<span className="text-sm">
											{index + 1}. {factor}
										</span>

										<RadioGroup
											name={`rating-${index}`}
											className="flex w-full justify-between"
											defaultValue={section?.rating?.toString() || ""}
										>
											{[1, 2, 3, 4, 5].map((rating) => (
												<Label
													key={rating}
													className="flex items-center space-x-1"
												>
													<RadioGroupItem
														value={rating.toString()}
														checked={section?.rating === rating}
													/>
													<span className="text-sm">{rating}</span>
												</Label>
											))}
										</RadioGroup>

										<Input
											name={`comment-${index}`}
											value={section?.comment || ""}
											readOnly
											placeholder="Add comment"
										/>
									</div>
								);
							})}
						</div>
						<div>
							<h2 className="mb-2 text-sm font-bold">RECOMMENDATIONS</h2>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="unfavorable" className="w-64 text-sm">
									Unfavorable
								</Label>
								<Input
									name="unfavorable"
									value={data.rate.sections.recommendations.unfavorable}
									readOnly
								/>
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="comparison" className="w-64 text-sm">
									For Comparison with others
								</Label>
								<Input
									name="comparison"
									value={data.rate.sections.recommendations.comparison}
									readOnly
								/>
							</div>
							<div className="mb-2 flex items-center space-x-2">
								<Label htmlFor="effective" className="w-64 text-sm">
									For hiring effective
								</Label>
								<Input
									name="effective"
									value={data.rate.sections.recommendations.effective}
									readOnly
								/>
							</div>
						</div>
						<div className="flex flex-col">
							<Button onClick={onClose}>Close</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default PanelInterViewModal;
