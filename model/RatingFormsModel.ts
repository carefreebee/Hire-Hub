import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./ApplicantModel";
import { User } from "./UserModel";

@Entity()
export class RatingForm {
	@PrimaryGeneratedColumn()
	ratingId!: number;

	@ManyToOne(() => Applicant, (applicant) => applicant.ratingForms)
	@JoinColumn({ name: "applicant_id" })
	applicant!: Applicant;

	@ManyToOne(() => User, (user) => user.ratingForms)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column()
	rate!: string;

	@Column()
	recruitmentStage!: string;

	@Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt!: Date;
}
