export class Department {
	departmentId: number;
	departmentName: string;
	departmentCode: string;

	constructor(departmentId: number, departmentName: string, departmentCode: string) {
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.departmentCode = departmentCode;
	}
}
