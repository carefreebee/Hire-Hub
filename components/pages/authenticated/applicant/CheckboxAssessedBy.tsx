import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { RoleEnumsType, roleEnums } from "~/lib/schema";
import { useSelectedAssessedBy } from "~/util/zustand";

export default function CheckboxAssessedBy() {
	const { assessedBy, setAssessedBy } = useSelectedAssessedBy((state) => ({
		assessedBy: state.assessedBy,
		setAssessedBy: state.setAssessedBy,
	}));

	function handleAssessedBy(event: React.ChangeEvent<HTMLInputElement>) {
		const { value, checked } = event.target;
		if (checked) {
			setAssessedBy([...assessedBy, value as RoleEnumsType]);
		} else {
			setAssessedBy(assessedBy.filter((role) => role !== value));
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="text-[#0F91D2]">
					{assessedBy.length === 0 ? "+Add Evaluators" : assessedBy.join(", ")}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<form className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Evaluators</h4>
					</div>
					{roleEnums.enumValues
						.filter((role) => role !== "user" && role !== "admin" && role !== "hr_head")
						.map((role) => (
							<div key={role} className="flex gap-2">
								<Input
									key={role}
									type="checkbox"
									value={role}
									checked={assessedBy.includes(role)}
									onChange={handleAssessedBy}
									className="h-auto w-auto"
								/>
								<Label>{role}</Label>
							</div>
						))}
				</form>
			</PopoverContent>
		</Popover>
	);
}
