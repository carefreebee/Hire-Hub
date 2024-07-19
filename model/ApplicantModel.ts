import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./CommentModel";
import { Department } from "./DepartmentModel";
import { Office } from "./OfficeModel";
import { RatingForm } from "./RatingFormsModel";

@Entity()
export class Applicant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column({ name: "contact_number", type: "bigint" })
	contactNumber: number;

	@Column({ name: "resume" })
	resume: string;

	@Column()
	communicationType: string;

	@Column({
		type: "enum",
		enum: ["teaching_staff", "non-teaching_staff"],
		default: "non-teaching_staff",
	})
	positionType: string;

	@Column()
	positionApplied: string;

	@ManyToOne(() => Department)
	@JoinColumn({ name: "department_id" })
	department: Department;

	@ManyToOne(() => Office)
	@JoinColumn({ name: "office_id" })
	office: Office;

	@Column({ name: "selected_department", nullable: true })
	selectedDepartment: string;

	@Column({ name: "selected_office", nullable: true })
	selectedOffice: string;

	@Column({ name: "applied_date", default: () => "CURRENT_TIMESTAMP" })
	appliedDate: Date;

	@Column("jsonb", { default: () => '\'{"screening": {"status": "in-progress"}}\'' })
	stages: object;

	@OneToMany(() => RatingForm, (ratingForm) => ratingForm.applicant)
	ratingForms!: RatingForm[];

	@OneToMany(() => Comment, (comment) => comment.applicant)
	comments!: Comment[];

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		email: string,
		contactNumber: number,
		resume: string,
		communicationType: string,
		positionType: string,
		positionApplied: string,
		department: Department,
		office: Office,
		selectedDepartment: string,
		selectedOffice: string,
		appliedDate: Date,
		stages: object
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.resume = resume;
		this.communicationType = communicationType;
		this.positionType = positionType;
		this.positionApplied = positionApplied;
		this.department = department;
		this.office = office;
		this.selectedDepartment = selectedDepartment;
		this.selectedOffice = selectedOffice;
		this.appliedDate = appliedDate;
		this.stages = stages;
	}

	// Getters
	getId(): number {
		return this.id;
	}

	getFirstName(): string {
		return this.firstName;
	}

	getLastName(): string {
		return this.lastName;
	}

	getEmail(): string {
		return this.email;
	}

	getContactNumber(): number {
		return this.contactNumber;
	}

	getResume(): string {
		return this.resume;
	}

	getCommunicationType(): string {
		return this.communicationType;
	}

	getPositionType(): string {
		return this.positionType;
	}

	getPositionApplied(): string {
		return this.positionApplied;
	}

	getDepartment(): Department {
		return this.department;
	}

	getOffice(): Office {
		return this.office;
	}

	getSelectedDepartment(): string {
		return this.selectedDepartment;
	}

	getSelectedOffice(): string {
		return this.selectedOffice;
	}

	getAppliedDate(): Date {
		return this.appliedDate;
	}

	getStages(): object {
		return this.stages;
	}

	getRatingForms(): RatingForm[] {
		return this.ratingForms;
	}

	getComments(): Comment[] {
		return this.comments;
	}

	// Setters
	setId(id: number): void {
		this.id = id;
	}

	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	setEmail(email: string): void {
		this.email = email;
	}

	setContactNumber(contactNumber: number): void {
		this.contactNumber = contactNumber;
	}

	setResume(resume: string): void {
		this.resume = resume;
	}

	setCommunicationType(communicationType: string): void {
		this.communicationType = communicationType;
	}

	setPositionType(positionType: string): void {
		this.positionType = positionType;
	}

	setPositionApplied(positionApplied: string): void {
		this.positionApplied = positionApplied;
	}

	setDepartment(department: Department): void {
		this.department = department;
	}

	setOffice(office: Office): void {
		this.office = office;
	}

	setSelectedDepartment(selectedDepartment: string): void {
		this.selectedDepartment = selectedDepartment;
	}

	setSelectedOffice(selectedOffice: string): void {
		this.selectedOffice = selectedOffice;
	}

	setAppliedDate(appliedDate: Date): void {
		this.appliedDate = appliedDate;
	}

	setStages(stages: object): void {
		this.stages = stages;
	}

	setRatingForms(ratingForms: RatingForm[]): void {
		this.ratingForms = ratingForms;
	}

	setComments(comments: Comment[]): void {
		this.comments = comments;
	}
}
