import {
	bigint,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", [
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
]);
export const communicationEnums = pgEnum("communicationType", ["email", "phone_number"]);
export const positionEnums = pgEnum("positionType", ["teaching_staff", "non-teaching_staff"]);
export const statusEnums = pgEnum("statusEnums", [
	"Screening",
	"Initial Interview",
	"TeachingDemo",
	"Pyschological Exam",
	"Panel InterView",
	"Recommendation for Hiring",
]);

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	avatarUrl: text("avatar_url"),
	email: text("email").unique().notNull(),
	role: roleEnums("role").notNull().default("user"),
	department_id: integer("department_id").references(() => department.department_id, {
		onDelete: "cascade",
	}),
	office_id: integer("office_id").references(() => office.office_id, { onDelete: "cascade" }),
	selected_department: text("selected_department"),
	selected_office: text("selected_office"),
	appliedAt: timestamp("applied_at").defaultNow(),
});

export const oauthAccounts = pgTable("oauth_accounts", {
	providerId: text("provider_id"),
	providerUserId: text("provider_user_id"),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

interface StageStatus {
	status?: "in-progress" | "passed" | "failed" | "";
	date?: Date | "";
	assessed_by?: string[];
	mode?: "online" | "in-person" | "";
	comment_id?: number[];
	rating_forms_id?: number[];
}

interface ApplicantStages {
	screening: StageStatus;
	initial_interview?: StageStatus;
	teaching_demo?: StageStatus;
	psychological_exam?: StageStatus;
	panel_interview?: StageStatus;
	recommendation_for_hiring?: StageStatus;
}

export const applicant = pgTable("applicant", {
	id: serial("id").primaryKey(),
	first_name: text("first_name"),
	last_name: text("last_name"),
	email: text("email").unique().notNull(),
	contact_number: bigint("contact_number", { mode: "number" }),
	resume: jsonb("resume").default({
		resume_name: "",
		resume_url: "",
		letter_name: "",
		letter_url: "",
	}),
	communication_type: communicationEnums("communicationType").notNull(),
	positionType: positionEnums("positionType").notNull(),
	position_applied: text("position_applied").notNull(),
	department_id: integer("department_id").references(() => department.department_id, {
		onDelete: "cascade",
	}),
	office_id: integer("office_id").references(() => office.office_id, { onDelete: "cascade" }),
	selected_department: text("selected_department"),
	selected_office: text("selected_office"),
	applied_date: timestamp("applied_date").defaultNow(),
	stages: jsonb("stages")
		.$type<ApplicantStages>()
		.default({
			screening: {
				status: "in-progress",
			},
		}),
});

export const ratingForms = pgTable("rating_forms", {
	rating_id: serial("rating_id").primaryKey(),
	applicant_id: integer("applicant_id").references(() => applicant.id, { onDelete: "cascade" }),
	user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }),
	rate: text("rate").notNull(),
	recruitment_stage: text("recruitment_stage").notNull(),
	created_at: timestamp("created_at").defaultNow(),
});

export const comments = pgTable("comments", {
	id: serial("id").primaryKey(),
	applicant_id: integer("applicant_id").references(() => applicant.id, { onDelete: "cascade" }),
	commented_by: text("user_id").references(() => users.id, { onDelete: "cascade" }),
	comment: text("comment").notNull(),
	commented_at: timestamp("commented_at").defaultNow(),
});

export const jobRequest = pgTable("jobRequest", {
	request_id: serial("request_id").primaryKey(),
	requested_position: text("requested_position").notNull(),
	requested_category: text("requested_category").notNull(),
	requested_department: text("requested_department"),
	requested_office: text("requested_office"),
	requested_type: text("requested_type").notNull(),
	requested_description: text("requested_description").notNull(),
	requested_qualification: text("requested_qualification").notNull(),
	requested_date: timestamp("requested_date").defaultNow(),
	department_id: integer("department_id").references(() => department.department_id, {
		onDelete: "cascade",
	}),
	office_id: integer("office_id").references(() => office.office_id, { onDelete: "cascade" }),
});

export const department = pgTable("department", {
	department_id: serial("department_id").primaryKey(),
	department_name: text("department_name").notNull().unique(),
});

export const office = pgTable("office", {
	office_id: serial("office_id").primaryKey(),
	office_name: text("office_name").notNull().unique(),
});

export type RoleEnumsType = User["role"];

export type UserRole = typeof roleEnums.enumValues;
export type communicationEnums = typeof communicationEnums.enumValues;
export type StatusEnums = typeof statusEnums.enumValues;

export type User = typeof users.$inferSelect;
export type ApplicantSelect = typeof applicant.$inferSelect;
export type DepartmentSelect = typeof department.$inferSelect;
export type OfficeSelect = typeof office.$inferSelect;
export type JobRequestSelect = typeof jobRequest.$inferSelect;
export type CommentsSelect = typeof comments.$inferSelect;
export type RatingFormsSelect = typeof ratingForms.$inferSelect;

export type ApplicantInsert = typeof applicant.$inferInsert;
export type DepartmentInsert = typeof department.$inferSelect;
export type OfficeInsert = typeof office.$inferInsert;
export type JobRequestInsert = typeof jobRequest.$inferInsert;
export type CommentsInsert = typeof comments.$inferInsert;
export type RatingFormsInsert = typeof ratingForms.$inferInsert;
