import { create } from "zustand";
import { RoleEnumsType, User } from "~/lib/schema";

type UploadDropZoneProps = {
	file: string | null;
	setFile: (file: string) => void;
};

export const useUploadDropZone = create<UploadDropZoneProps>((set) => ({
	file: null,
	setFile: (file) => {
		set({ file: file });
	},
}));

type CurrentRole = {
	currentRole: RoleEnumsType | "";
	setCurrentRole: (currentRole: RoleEnumsType) => void;
};

export const useCurrentRole = create<CurrentRole>((set) => ({
	currentRole: "",
	setCurrentRole: (role) => {
		set({ currentRole: role });
	},
}));

type FilteredEvaluate = {
	filteredEvaluate: string;
	setFilteredEvaluate: (filteredEvaluate: string) => void;
};

export const useFilteredEvaluate = create<FilteredEvaluate>((set) => ({
	filteredEvaluate: "",
	setFilteredEvaluate: (filter) => set({ filteredEvaluate: filter }),
}));

type SelectPassedOrFailed = {
	status: "passed" | "failed" | "in-progress";
	setStatus: (value: "passed" | "failed" | "in-progress") => void;
};

export const useSelectPassedOrFailed = create<SelectPassedOrFailed>((set) => ({
	status: "in-progress",
	setStatus: (newStatus) => {
		set({ status: newStatus });
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

type SelectedMode = {
	mode: "online" | "in-person";
	setMode: (mode: "online" | "in-person") => void;
};

export const useSelectedMode = create<SelectedMode>((set) => ({
	mode: "online",
	setMode: (mode: "online" | "in-person") => {
		set(() => ({ mode: mode }));
	},
}));

type SelectedAssessedBy = {
	assessedBy: Partial<User> | Partial<User>[];
	setAssessedBy: (assessedBy: Partial<User> | Partial<User>[]) => void;
};

export const useSelectedAssessedBy = create<SelectedAssessedBy>((set) => ({
	assessedBy: [],
	setAssessedBy: (assessedBy) => set({ assessedBy }),
}));
