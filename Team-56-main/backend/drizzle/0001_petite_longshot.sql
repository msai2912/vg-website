CREATE TABLE "academic_records" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "academic_records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" integer NOT NULL,
	"grade" integer NOT NULL,
	"subject_name" varchar(100) NOT NULL,
	"marks" integer NOT NULL,
	"max_marks" integer DEFAULT 100 NOT NULL,
	"term" varchar(20),
	"academic_year" varchar(10) NOT NULL,
	"educator_id" integer,
	"remarks" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" integer NOT NULL,
	"leadership_score" integer,
	"leadership_notes" text,
	"weight" numeric(5, 2),
	"height" numeric(5, 2),
	"bmi" numeric(4, 2),
	"health_notes" text,
	"gk_score" integer,
	"english_speaking_score" integer,
	"english_reading_score" integer,
	"english_writing_score" integer,
	"communication_score" integer,
	"teamwork_score" integer,
	"creativity_score" integer,
	"assessment_date" timestamp DEFAULT now(),
	"assessment_type" varchar(50),
	"educator_id" integer,
	"overall_notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "centers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "centers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"phone" varchar(20),
	"email" varchar(255),
	"program_manager_id" integer,
	"capacity" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "community_educators" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "community_educators_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"googleId" varchar(255),
	"phone" varchar(20),
	"center_id" integer NOT NULL,
	"qualifications" text,
	"specialization" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "community_educators_email_unique" UNIQUE("email"),
	CONSTRAINT "community_educators_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
CREATE TABLE "program_managers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "program_managers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"googleId" varchar(255),
	"phone" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "program_managers_email_unique" UNIQUE("email"),
	CONSTRAINT "program_managers_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
CREATE TABLE "progress_tracking" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "progress_tracking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" integer NOT NULL,
	"category" varchar(50) NOT NULL,
	"skill_name" varchar(100) NOT NULL,
	"level" varchar(20) NOT NULL,
	"notes" text,
	"assessment_date" timestamp DEFAULT now(),
	"educator_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "students_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"contact" varchar(20) NOT NULL,
	"caste" varchar(50) NOT NULL,
	"grade" integer NOT NULL,
	"school" varchar(100) NOT NULL,
	"address" text NOT NULL,
	"center_id" integer NOT NULL,
	"guardian_name" varchar(255),
	"guardian_contact" varchar(20),
	"family_problems" text,
	"enrollment_date" timestamp DEFAULT now(),
	"is_active" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "googleId" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_type" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_educator_id_community_educators_id_fk" FOREIGN KEY ("educator_id") REFERENCES "public"."community_educators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_educator_id_community_educators_id_fk" FOREIGN KEY ("educator_id") REFERENCES "public"."community_educators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "centers" ADD CONSTRAINT "centers_program_manager_id_program_managers_id_fk" FOREIGN KEY ("program_manager_id") REFERENCES "public"."program_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_educators" ADD CONSTRAINT "community_educators_center_id_centers_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."centers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress_tracking" ADD CONSTRAINT "progress_tracking_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress_tracking" ADD CONSTRAINT "progress_tracking_educator_id_community_educators_id_fk" FOREIGN KEY ("educator_id") REFERENCES "public"."community_educators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_center_id_centers_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."centers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_googleId_unique" UNIQUE("googleId");