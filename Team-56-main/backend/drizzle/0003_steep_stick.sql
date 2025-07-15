CREATE TABLE "trees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tree_type" varchar(100) NOT NULL,
	"species" varchar(150),
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"location" text NOT NULL,
	"district" varchar(100) NOT NULL,
	"state" varchar(50) DEFAULT 'Tamil Nadu' NOT NULL,
	"status" varchar(50) DEFAULT 'planted' NOT NULL,
	"health_status" varchar(50) DEFAULT 'healthy',
	"planted_by" varchar(255) NOT NULL,
	"planted_by_type" varchar(50) NOT NULL,
	"planted_by_ref" integer,
	"center_id" integer,
	"planted_date" timestamp NOT NULL,
	"last_inspection" timestamp,
	"height" numeric(5, 2),
	"diameter" numeric(5, 2),
	"notes" text,
	"image_url" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "trees" ADD CONSTRAINT "trees_center_id_centers_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."centers"("id") ON DELETE no action ON UPDATE no action;