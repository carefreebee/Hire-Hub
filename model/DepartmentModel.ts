import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
	@PrimaryGeneratedColumn()
	departmentId!: number;

	@Column({ unique: true })
	departmentName!: string;
}
