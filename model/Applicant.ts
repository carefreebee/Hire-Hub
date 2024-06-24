import { ApplicantStages, communicationEnums, positionEnums, statusEnums } from "~/lib/schema";

export class Applicant {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	contactNumber: bigint | null;
	resume: string | null;
	applicationLetter: string | null;
	communicationType: typeof communicationEnums;
	positionType: typeof positionEnums;
	departmentId: number | null;
	officeId: number | null;
	departmentName: string;
	officeName: string;
	status: typeof statusEnums;
	stages: ApplicantStages;

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		email: string,
		contactNumber: bigint | null,
		resume: string | null,
		applicationLetter: string | null,
		communicationType: typeof communicationEnums,
		positionType: typeof positionEnums,
		departmentId: number | null,
		officeId: number | null,
		departmentName: string,
		officeName: string,
		status: typeof statusEnums,
		stages: ApplicantStages
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.resume = resume;
		this.applicationLetter = applicationLetter;
		this.communicationType = communicationType;
		this.positionType = positionType;
		this.departmentId = departmentId;
		this.officeId = officeId;
		this.departmentName = departmentName;
		this.officeName = officeName;
		this.status = status;
		this.stages = stages;
	}
}
