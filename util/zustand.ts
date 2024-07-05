import { create } from "zustand";
import { getAllApplicantForm } from "~/controller/ApplicantController";
import { ApplicantSelect, RoleEnumsType } from "~/lib/schema";

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
	assessedBy: RoleEnumsType[];
	setAssessedBy: (assessedBy: RoleEnumsType[]) => void;
};

export const useSelectedAssessedBy = create<SelectedAssessedBy>((set) => ({
	assessedBy: [],
	setAssessedBy: (assessedBy) => set({ assessedBy }),
}));
