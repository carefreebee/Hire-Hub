DO $$ BEGIN
 CREATE TYPE "public"."civilStatus" AS ENUM('single', 'married', 'widowed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."communicationType" AS ENUM('email', 'phone_number');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."genderType" AS ENUM('male', 'female', 'prefer_not_to_say');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."highestEducationAttainment" AS ENUM('doctorate', 'masteral', 'bachelors');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."jobExperience" AS ENUM('entry_level', 'experienced', 'advanced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."jobOpening" AS ENUM('open', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."jobStatus" AS ENUM('pending', 'approved', 'denied');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'hr_head', 'recruitment_officer', 'requester_staff', 'department_chair', 'dean', 'faculty', 'guidance_center_staff', 'vp_acad_affairs', 'vp_administration', 'univ_president');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."statusEnums" AS ENUM('Screening', 'Initial Interview', 'TeachingDemo', 'Pyschological Exam', 'Panel InterView', 'Recommendation for Hiring');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applicant" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"genderType" "genderType" NOT NULL,
	"birthdate" date NOT NULL,
	"address" text NOT NULL,
	"province" text NOT NULL,
	"city" text NOT NULL,
	"baranggay" text NOT NULL,
	"civilStatus" "civilStatus" NOT NULL,
	"highestEducationalAttainment" "highestEducationAttainment" NOT NULL,
	"degree" text NOT NULL,
	"jobExperience" "jobExperience" NOT NULL,
	"skills" text,
	"contact_number" bigint,
	"resume" jsonb DEFAULT '{"resume_name":"","resume_url":"","letter_name":"","letter_url":""}'::jsonb,
	"communicationType" "communicationType" NOT NULL,
	"positionType" text NOT NULL,
	"position_applied" text NOT NULL,
	"department_id" integer,
	"office_id" integer,
	"selected_department" text,
	"selected_office" text,
	"applied_date" timestamp DEFAULT now(),
	"stages" jsonb DEFAULT '{"screening":{"status":"in-progress"}}'::jsonb,
	CONSTRAINT "applicant_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicant_id" integer,
	"user_id" text,
	"comment" text NOT NULL,
	"commented_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"department_id" serial PRIMARY KEY NOT NULL,
	"department_code" text NOT NULL,
	"department_name" text NOT NULL,
	CONSTRAINT "department_department_code_unique" UNIQUE("department_code"),
	CONSTRAINT "department_department_name_unique" UNIQUE("department_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobRequest" (
	"request_id" serial PRIMARY KEY NOT NULL,
	"requested_position" text NOT NULL,
	"requested_category" text NOT NULL,
	"requested_department" text,
	"requested_office" text,
	"requested_type" text NOT NULL,
	"requested_description" text NOT NULL,
	"requested_qualification" text NOT NULL,
	"requested_date" timestamp DEFAULT now(),
	"department_id" integer,
	"jobStatus" "jobStatus" DEFAULT 'pending' NOT NULL,
	"jobOpening" "jobOpening" DEFAULT 'open' NOT NULL,
	"office_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_accounts" (
	"provider_id" text,
	"provider_user_id" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "office" (
	"office_id" serial PRIMARY KEY NOT NULL,
	"office_code" text NOT NULL,
	"office_name" text NOT NULL,
	CONSTRAINT "office_office_code_unique" UNIQUE("office_code"),
	CONSTRAINT "office_office_name_unique" UNIQUE("office_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rating_forms" (
	"rating_id" serial PRIMARY KEY NOT NULL,
	"applicant_id" integer,
	"user_id" text,
	"rate" text NOT NULL,
	"recruitment_stage" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"first_name" text,
	"last_name" text,
	"avatar_url" text,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"department_id" integer,
	"office_id" integer,
	"selected_department" text,
	"selected_office" text,
	"applied_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicant" ADD CONSTRAINT "applicant_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("department_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicant" ADD CONSTRAINT "applicant_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("office_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_applicant_id_applicant_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."applicant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("department_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("office_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating_forms" ADD CONSTRAINT "rating_forms_applicant_id_applicant_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."applicant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating_forms" ADD CONSTRAINT "rating_forms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("department_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("office_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
