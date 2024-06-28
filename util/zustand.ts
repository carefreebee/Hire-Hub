import { create } from "zustand";

type SelectPassedOrFailed = {
	status: "passed" | "failed" | "In Progress";
	setStatus: (value: "passed" | "failed" | "In Progress") => void;
};

export const useSelectPassedOrFailed = create<SelectPassedOrFailed>((set) => ({
	status: "In Progress",
	setStatus: (newStatus) => {
		set({ status: newStatus });
	},
}));

type SelectOnlineOrInPerson = {
	mode: "online" | "in-person";
	setMode: (value: "online" | "in-person") => void;
};

export const useSelectOnlineOrInPerson = create<SelectOnlineOrInPerson>((set) => ({
	mode: "online",
	setMode: (newMode) => {
		set({ mode: newMode });
	},
}));

type SelectedDateAndTime = {
	dateTime: Date | undefined;
	setDateTime: (dateTime: Date | undefined) => void;
};

export const useSelectedDateAndTime = create<SelectedDateAndTime>((set) => ({
	dateTime: undefined,
	setDateTime: (dateTime: Date | undefined) => {
		set(() => ({ dateTime: dateTime }));
	},
}));
