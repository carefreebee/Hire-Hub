"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useSelectedMode } from "~/util/zustand";

export default function SelectMode() {
	const { mode, setMode } = useSelectedMode((state) => ({
		mode: state.mode,
		setMode: state.setMode,
	}));

	return (
		<>
			<Select onValueChange={(value) => setMode(value as "online" | "in-person")}>
				<SelectTrigger className="h-auto w-32 py-1">
					<SelectValue placeholder="Select Mode" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup className="">
						<SelectItem value="online" className="text-green-500">
							Online
						</SelectItem>
						<SelectItem value="in-person" className="text-red-500">
							In Person
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}
