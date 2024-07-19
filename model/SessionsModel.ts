import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserModel";

@Entity()
export class Sessions {
	@PrimaryGeneratedColumn()
	id!: string;

	@ManyToOne(() => User, (user) => user.sessions)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column({ name: "expires_at" })
	expiresAt!: Date;
}
