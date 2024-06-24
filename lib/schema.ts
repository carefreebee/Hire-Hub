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
	// "faculty",
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

// interface StageStatus {
// 	status: "in-progress" | "passed" | "failed";
// 	date: Date;
// 	mode?: "online" | "in-person";
// }

export type ApplicantStages = {
	screening: {
		status: "in-progress" | "passed" | "failed";
		date: Date;
		mode?: "online" | "in-person";
	};
};

export const applicant = pgTable("applicant", {
	id: serial("id").primaryKey(),
	first_Name: text("first_name"),
	last_Name: text("last_name"),
	email: text("email").unique().notNull(),
	contactNumber: bigint("contact_number", { mode: "number" }),
	resume: text("resume_url"),
	applicationLetter: text("application_letter"),
	communication: communicationEnums("communicationType").notNull(),
	position: positionEnums("positionType").notNull(),
	departmentId: integer("department_id").references(() => department.department_id),
	officeId: integer("office_id").references(() => office.office_id),
	departmentName: text("department_name"),
	officeName: text("office_name"),
	status: statusEnums("status").default("Screening"),
	stages: jsonb("stages")
		.$type<ApplicantStages>()
		.default({
			screening: {
				status: "in-progress",
				date: new Date(),
			},
		}),
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
	department_id: integer("department_id").references(() => department.department_id),
	office_id: integer("office_id").references(() => office.office_id),
});

export const department = pgTable("department", {
	department_id: serial("department_id").primaryKey(),
	// DEPARTMENT NAME MUST BE UNIQUE
	department_name: text("department_name").notNull(),
});

export const office = pgTable("office", {
	office_id: serial("office_id").primaryKey(),
	// OFFICE NAME MUST BE UNIQUE
	office_name: text("office_name").notNull(),
});

// export const sessions = pgTable("sessions", {
// 	id: text("id").primaryKey(),
// 	userId: text("user_id")
// 		.notNull()
// 		.references(() => users.id),
// 	expiresAt: timestamp("expires_at", {
// 		withTimezone: true,
// 		mode: "date",
// 	}).notNull(),
// });

// export const office = pgTable("office", {
// 	office_id: serial("office_id").primaryKey(),
// 	office_name: text("office_name").unique().notNull(),
// 	office_code: text("office_code").unique().notNull(),
// });

// export const requestRelation = relations()

// export const requestRelation = relations(jobRequest, ({ one }) => ({
// 	department: one(department, {
// 		fields: [jobRequest.departmentId],
// 		references: [department.department_id],
// 	}),
// 	office: one(office, {
// 		fields: [jobRequest.officeId],
// 		references: [office.office_id],
// 	}),
// }));

export const rating = pgTable("rating", {
	rating_id: serial("rating_id").primaryKey(),
	status_name: text("status_name").notNull(),
	applicantId: integer("applicantid").references(() => applicant.id),
	rating: integer("rating").notNull(),
});

// export const departmenttRelation = relations(department, ({ many, one }) => ({
// 	applicant: many(applicant),
// 	user: one(users),
// }));

// export const Rating = relations(rating, ({ one }) => ({
// 	applicant: one(applicant, {
// 		fields: [rating.applicantId],
// 		references: [applicant.id],
// 	}),
// }));

// export const officeRelation = relations(office, ({ many, one }) => ({
// 	applicant: many(applicant),
// 	user: one(users),
// }));

// export const applicantRelation = relations(applicant, ({ one }) => ({
// 	department: one(department, {
// 		fields: [applicant.departmentId],
// 		references: [department.department_id],
// 	}),
// 	office: one(office, {
// 		fields: [applicant.officeId],
// 		references: [office.office_id],
// 	}),
// }));

// export const userRelation = relations(users, ({ one }) => ({
// 	department: one(department, {
// 		fields: [users.departmentId],
// 		references: [department.department_id],
// 	}),
// 	office: one(office, {
// 		fields: [users.officeId],
// 		references: [office.office_id],
// 	}),
// }));

// export const departmentRelation = relations(department, ({ }) => ({
//   user:
// }))

// export const Office = pgTable("Office", {
//     office_id: serial("OfficeID").primaryKey(),
//     office_name: text("office_name").unique().notNull(),

// })

// Department must have a choices that the applicant can select
// department: text("department").notNull(),
//role: roleEnums("role").notNull().default("applicant"),

export type User = typeof users.$inferSelect;
export type ApplicantSelect = typeof applicant.$inferSelect;
export type ApplicantInsert = typeof applicant.$inferInsert;
export type DepartmentSelect = typeof department.$inferSelect;
export type DepartmentInsert = typeof department.$inferSelect;
// export type OfficeSelect = typeof office.$inferSelect;
// export type OfficeInsert = typeof office.$inferInsert;
export type JobRequestSelect = typeof jobRequest.$inferSelect;
export type JobRequestInsert = typeof jobRequest.$inferInsert;
export type UserRole = typeof roleEnums.enumValues;
export type communicationEnums = typeof communicationEnums.enumValues;
export type StatusEnums = typeof statusEnums.enumValues;
export type RatingSelect = typeof rating.$inferSelect;
export type RatingInsert = typeof rating.$inferSelect;
