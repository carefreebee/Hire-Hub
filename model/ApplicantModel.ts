// import {
// 	bigint,
// 	integer,
// 	jsonb,
// 	pgEnum,
// 	pgTable,
// 	serial,
// 	text,
// 	timestamp,
// } from "drizzle-orm/pg-core";
// import { department } from "./Department";
// import { office } from "./Office";

// interface StageStatus {
// 	status?: "in-progress" | "passed" | "failed" | "";
// 	date?: Date | "";
// 	assessed_by?: string[];
// 	mode?: "online" | "in-person" | "";
// 	comment_id?: number[];
// 	rating_forms_id?: number[];
// }

// interface ApplicantStages {
// 	screening: StageStatus;
// 	initial_interview?: StageStatus;
// 	teaching_demo?: StageStatus;
// 	psychological_exam?: StageStatus;
// 	panel_interview?: StageStatus;
// 	recommendation_for_hiring?: StageStatus;
// }

// const communicationEnums = pgEnum("communicationType", ["email", "phone_number"]);
// const positionEnums = pgEnum("positionType", ["teaching_staff", "non-teaching_staff"]);
// const statusEnums = pgEnum("statusEnums", [
// 	"Screening",
// 	"Initial Interview",
// 	"TeachingDemo",
// 	"Pyschological Exam",
// 	"Panel InterView",
// 	"Recommendation for Hiring",
// ]);

// export const applicant = pgTable("applicant", {
// 	id: serial("id").primaryKey(),
// 	first_name: text("first_name"),
// 	last_name: text("last_name"),
// 	email: text("email").unique().notNull(),
// 	contact_number: bigint("contact_number", { mode: "number" }),
// 	resume: text("resume_url"),
// 	communication_type: communicationEnums("communicationType").notNull(),
// 	positionType: positionEnums("positionType").notNull(),
// 	position_applied: text("position_applied").notNull(),
// 	department_id: integer("department_id").references(() => department.department_id, {
// 		onDelete: "cascade",
// 	}),
// 	office_id: integer("office_id").references(() => office.office_id, { onDelete: "cascade" }),
// 	selected_department: text("selected_department"),
// 	selected_office: text("selected_office"),
// 	applied_date: timestamp("applied_date").defaultNow(),
// 	stages: jsonb("stages")
// 		.$type<ApplicantStages>()
// 		.default({
// 			screening: {
// 				status: "in-progress",
// 			},
// 		}),
// });

// export type communicationEnums = typeof communicationEnums.enumValues;
// export type StatusEnums = typeof statusEnums.enumValues;
