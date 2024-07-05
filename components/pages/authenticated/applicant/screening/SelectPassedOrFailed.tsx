"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useSelectPassedOrFailed } from "~/util/zustand";

export default function SelectPassedOrFailed() {
	const { status, setStatus } = useSelectPassedOrFailed((state) => ({
		status: state.status,
		setStatus: state.setStatus,
	}));

	return (
		<Select onValueChange={(value) => setStatus(value as "passed" | "failed" | "In Progress")}>
			<SelectTrigger className="h-auto w-32 py-1">
				<SelectValue placeholder={status} className="mt-0" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="passed" className="text-green-500">
						Passed
					</SelectItem>
					<SelectItem value="failed" className="text-red-500">
						Failed
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
