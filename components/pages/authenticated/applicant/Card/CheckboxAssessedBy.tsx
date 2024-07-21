"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { User } from "~/lib/schema";
import { formattedNameAndRole } from "~/util/formatted-name";
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
					+ Add Evaluators
				</Button>
			</PopoverTrigger>
			<PopoverContent className="h-96 w-[450px] overflow-y-auto">
				<form className="grid gap-4">
					<Table>
						<TableCaption>Evaluators</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Select</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className="text-right">Role</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{assessed_by.map((user) => (
								<TableRow key={user.id} className="text-center">
									<TableCell className="h-10">
										<Input
											type="checkbox"
											value={user.role}
											checked={assessedBy.some((u) => u.id === user.id)}
											onChange={(e) =>
												handleAssessedBy(user, e.target.checked)
											}
											className="mx-auto h-auto w-auto"
										/>
									</TableCell>
									<TableCell className="h-10">
										<Label>
											{formattedNameAndRole(user?.name as string, "_")}
										</Label>
									</TableCell>
									<TableCell className="h-10 text-right">
										<Label>
											{formattedNameAndRole(user?.role as string, "_")}
										</Label>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</form>
			</PopoverContent>
		</Popover>
	);
}
