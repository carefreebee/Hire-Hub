import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Office {
	@PrimaryGeneratedColumn()
	officeId!: number;

	@Column({ unique: true })
	officeName!: string;
}
