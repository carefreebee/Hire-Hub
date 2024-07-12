"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { User } from "~/lib/schema";
import { formattedApplicantStatus, formattedName } from "~/util/formatted-name";
import { useSelectedAssessedBy } from "~/util/zustand";

type CheckboxAssessedByProps = {
	assessed_by: Partial<User>[];
};

export default function CheckboxAssessedBy({ assessed_by }: CheckboxAssessedByProps) {
	const { assessedBy, setAssessedBy } = useSelectedAssessedBy((state) => ({
		assessedBy: state.assessedBy as Partial<User>[],
		setAssessedBy: state.setAssessedBy,
	}));

	function handleAssessedBy(user: Partial<User>, checked: boolean) {
		if (checked) {
			setAssessedBy([...assessedBy, user]);
		} else {
			setAssessedBy(assessedBy.filter((u) => u.id !== user.id));
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="text-[#0F91D2]">
					{/* {assessedBy.length === 0
						? "+ Add Evaluators"
						: assessedBy.map((user) => user.name).join(", ")} */}
					+ Add Evaluators
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<form className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Evaluators</h4>
					</div>
					{assessed_by.map((user) => (
						<div key={user.id} className="flex gap-2">
							<Input
								type="checkbox"
								value={user.role}
								checked={assessedBy.some((u) => u.id === user.id)}
								onChange={(e) => handleAssessedBy(user, e.target.checked)}
								className="h-auto w-auto"
							/>
							<Label>
								{formattedName(user?.name ?? "")} -{" "}
								{formattedApplicantStatus(user?.role ?? "")}
							</Label>
						</div>
					))}
				</form>
			</PopoverContent>
		</Popover>
	);
}
