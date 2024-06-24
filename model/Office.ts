export class Office {
	officeId: number;
	officeName: string;
	officeCode: string;

	constructor(officeId: number, officeName: string, officeCode: string) {
		this.officeId = officeId;
		this.officeName = officeName;
		this.officeCode = officeCode;
	}
}
