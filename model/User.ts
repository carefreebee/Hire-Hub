import { roleEnums } from "~/lib/schema";

export class User {
	id: string;
	name: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	email: string;
	role: typeof roleEnums;
	departmentId: number;
	departmentName: string;
	officeId: number;
	officeName: string;
	appliedAt: Date;

	constructor(
		id: string,
		name: string,
		firstName: string,
		lastName: string,
		avatarUrl: string,
		email: string,
		role: typeof roleEnums,
		departmentId: number,
		departmentName: string,
		officeId: number,
		officeName: string,
		appliedAt: Date
	) {
		this.id = id;
		this.name = name;
		this.firstName = firstName;
		this.lastName = lastName;
		this.avatarUrl = avatarUrl;
		this.email = email;
		this.role = role;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.officeId = officeId;
		this.officeName = officeName;
		this.appliedAt = appliedAt;
	}
}
