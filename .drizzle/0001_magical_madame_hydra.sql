ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "jobRequest" ADD COLUMN "updated_by" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
