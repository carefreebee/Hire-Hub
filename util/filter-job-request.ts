export type Job = {
	requested_department: string;
	requested_office: string;
};

export type JobProperty = "requested_department" | "requested_office";

export function filterAndMapJobProperty(jobs: Job[], propertyName: JobProperty): string[] {
	return jobs.filter((job) => job[propertyName] !== null).map((job) => job[propertyName]);
}
