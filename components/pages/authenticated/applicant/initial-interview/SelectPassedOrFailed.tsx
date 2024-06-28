"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useSelectOnlineOrInPerson } from "~/util/zustand";

export default function SelectPassedOrFailed() {
	const { mode, setMode } = useSelectOnlineOrInPerson((state) => ({
		mode: state.mode,
		setMode: state.setMode,
	}));

	return (
		<>
			<Select
				onValueChange={(value) => setMode(value as "online" | "in-person")}
			>
				<SelectTrigger className="w-32">
					<SelectValue placeholder={mode} />
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
