import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./ApplicantModel";
import { User } from "./UserModel";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Applicant, (applicant) => applicant.comments)
	@JoinColumn({ name: "applicant_id" })
	applicant!: Applicant;

	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: "user_id" })
	commentedBy!: User;

	@Column()
	comment!: string;

	@Column({ name: "commented_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	commentedAt!: Date;
}
