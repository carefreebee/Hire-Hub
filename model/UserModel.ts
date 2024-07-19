import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./CommentModel";
import { OAuthAccount } from "./OauthModel";
import { RatingForm } from "./RatingFormsModel";
import { Sessions } from "./SessionsModel";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column({ name: "avatar_url" })
	avatarUrl: string;

	@Column({ unique: true })
	email: string;

	@Column({
		type: "enum",
		enum: [
			"admin",
			"user",
			"hr_head",
			"recruitment_officer",
			"requester_staff",
			"department_chair",
			"dean",
			"faculty",
			"guidance_center_staff",
			"vp_acad_affairs",
			"vp_administration",
			"univ_president",
		],
		default: "user",
	})
	role: string;

	@Column({ name: "department_id" })
	departmentId: number;

	@Column({ name: "office_id" })
	officeId: number;

	@Column({ name: "selected_department" })
	selectedDepartment: string;

	@Column({ name: "selected_office" })
	selectedOffice: string;

	@Column({ name: "applied_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	appliedAt: Date;

	@OneToMany(() => OAuthAccount, (oauthAccount) => oauthAccount.user)
	oauthAccounts: OAuthAccount[];

	@OneToMany(() => Sessions, (sessions) => sessions.user)
	sessions: Sessions[];

	@OneToMany(() => RatingForm, (ratingForms) => ratingForms.user)
	ratingForms: RatingForm[];

	@OneToMany(() => Comment, (comments) => comments.commentedBy)
	comments: Comment[];

	constructor(data: {
		id: string;
		name: string;
		firstName: string;
		lastName: string;
		avatarUrl: string;
		email: string;
		role: string;
		departmentId: number;
		officeId: number;
		selectedDepartment: string;
		selectedOffice: string;
		appliedAt: Date;
		oauthAccounts: OAuthAccount[];
		sessions: Sessions[];
		ratingForms: RatingForm[];
		comments: Comment[];
	}) {
		this.id = data.id;
		this.name = data.name;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatarUrl = data.avatarUrl;
		this.email = data.email;
		this.role = data.role;
		this.departmentId = data.departmentId;
		this.officeId = data.officeId;
		this.selectedDepartment = data.selectedDepartment;
		this.selectedOffice = data.selectedOffice;
		this.appliedAt = data.appliedAt;
		this.oauthAccounts = data.oauthAccounts;
		this.sessions = data.sessions;
		this.ratingForms = data.ratingForms;
		this.comments = data.comments;
	}

	// Getters
	getId(): string {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getFirstName(): string {
		return this.firstName;
	}

	getLastName(): string {
		return this.lastName;
	}

	getAvatarUrl(): string {
		return this.avatarUrl;
	}

	getEmail(): string {
		return this.email;
	}

	getRole(): string {
		return this.role;
	}

	getDepartmentId(): number {
		return this.departmentId;
	}

	getOfficeId(): number {
		return this.officeId;
	}

	getSelectedDepartment(): string {
		return this.selectedDepartment;
	}

	getSelectedOffice(): string {
		return this.selectedOffice;
	}

	getAppliedAt(): Date {
		return this.appliedAt;
	}

	// Setters
	setId(id: string): void {
		this.id = id;
	}

	setName(name: string): void {
		this.name = name;
	}

	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	setAvatarUrl(avatarUrl: string): void {
		this.avatarUrl = avatarUrl;
	}

	setEmail(email: string): void {
		this.email = email;
	}

	setRole(role: string): void {
		this.role = role;
	}

	setDepartmentId(departmentId: number): void {
		this.departmentId = departmentId;
	}

	setOfficeId(officeId: number): void {
		this.officeId = officeId;
	}

	setSelectedDepartment(selectedDepartment: string): void {
		this.selectedDepartment = selectedDepartment;
	}

	setSelectedOffice(selectedOffice: string): void {
		this.selectedOffice = selectedOffice;
	}

	setAppliedAt(appliedAt: Date): void {
		this.appliedAt = appliedAt;
	}
}
