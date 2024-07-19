import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./DepartmentModel";
import { Office } from "./OfficeModel";

@Entity()
export class JobRequest {
	@PrimaryGeneratedColumn()
    requestId!: number;

	@Column()
    requestedPosition!: string;

	@Column()
    requestedCategory!: string;

	@Column()
    requestedDepartment!: string;

	@Column()
    requestedOffice!: string;

	@Column()
    requestedType!: string;

	@Column()
    requestedDescription!: string;

	@Column()
    requestedQualification!: string;

	@Column({ name: "requested_date", default: "CURRENT_TIMESTAMP" })
    requestedDate!: Date;

	@ManyToOne(() => Department)
    @JoinColumn({ name: "department_id" })
    department!: Department;

	@ManyToOne(() => Office)
	@JoinColumn({ name: "office_id" })
	office!: Office;
}
