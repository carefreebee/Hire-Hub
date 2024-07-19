import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./UserModel";

@Entity()
export class OAuthAccount {
	@Column()
    providerId!: string;

	@Column()
    providerUserId!: string;

	@ManyToOne(() => User, (user) => user.oauthAccounts)
    @JoinColumn({ name: "user_id" })
    user!: User;
}
