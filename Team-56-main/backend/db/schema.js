import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const programManagersTable = pgTable("program_managers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  googleId: varchar("googleId", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const centersTable = pgTable("centers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  programManagerId: integer("program_manager_id").references(
    () => programManagersTable.id
  ),
  capacity: integer("capacity"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const communityEducatorsTable = pgTable("community_educators", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  googleId: varchar("googleId", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }),
  centerId: integer("center_id")
    .references(() => centersTable.id)
    .notNull(),
  qualifications: text("qualifications"),
  specialization: varchar("specialization", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studentsTable = pgTable("students", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  contact: varchar("contact", { length: 20 }).notNull(),
  caste: varchar("caste", { length: 50 }).notNull(),
  grade: integer("grade").notNull(),
  school: varchar("school", { length: 100 }).notNull(),
  address: text("address").notNull(),
  centerId: integer("center_id")
    .references(() => centersTable.id)
    .notNull(),
  guardianName: varchar("guardian_name", { length: 255 }),
  guardianContact: varchar("guardian_contact", { length: 20 }),
  familyProblems: text("family_problems"),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  isActive: integer("is_active").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const academicRecordsTable = pgTable("academic_records", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer("student_id")
    .references(() => studentsTable.id)
    .notNull(),
  grade: integer("grade").notNull(),
  subjectName: varchar("subject_name", { length: 100 }).notNull(),
  marks: integer("marks").notNull(),
  maxMarks: integer("max_marks").notNull().default(100),
  term: varchar("term", { length: 20 }),
  academicYear: varchar("academic_year", { length: 10 }).notNull(),
  educatorId: integer("educator_id").references(
    () => communityEducatorsTable.id
  ),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assessmentsTable = pgTable("assessments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer("student_id")
    .references(() => studentsTable.id)
    .notNull(),

  leadershipScore: integer("leadership_score"),
  leadershipNotes: text("leadership_notes"),

  weight: decimal("weight", { precision: 5, scale: 2 }),
  height: decimal("height", { precision: 5, scale: 2 }),
  bmi: decimal("bmi", { precision: 5, scale: 2 }),
  healthNotes: text("health_notes"),

  generalKnowledgeScore: integer("gk_score"),
  englishSpeakingScore: integer("english_speaking_score"),
  englishReadingScore: integer("english_reading_score"),
  englishWritingScore: integer("english_writing_score"),
  communicationScore: integer("communication_score"),
  teamworkScore: integer("teamwork_score"),
  creativityScore: integer("creativity_score"),

  assessmentDate: timestamp("assessment_date").defaultNow(),
  assessmentType: varchar("assessment_type", { length: 50 }),
  educatorId: integer("educator_id").references(
    () => communityEducatorsTable.id
  ),
  overallNotes: text("overall_notes"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const progressTrackingTable = pgTable("progress_tracking", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer("student_id")
    .references(() => studentsTable.id)
    .notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  skillName: varchar("skill_name", { length: 100 }).notNull(),
  level: varchar("level", { length: 20 }).notNull(),
  notes: text("notes"),
  assessmentDate: timestamp("assessment_date").defaultNow(),
  educatorId: integer("educator_id").references(
    () => communityEducatorsTable.id
  ),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const treesTable = pgTable("trees", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  treeType: varchar("tree_type", { length: 100 }).notNull(),
  species: varchar("species", { length: 150 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  location: text("location").notNull(),
  district: varchar("district", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull().default("Tamil Nadu"),
  status: varchar("status", { length: 50 }).notNull().default("planted"),
  healthStatus: varchar("health_status", { length: 50 }).default("healthy"),
  plantedBy: varchar("planted_by", { length: 255 }).notNull(),
  plantedByType: varchar("planted_by_type", { length: 50 }).notNull(),
  plantedByRef: integer("planted_by_ref"),
  centerId: integer("center_id").references(() => centersTable.id),
  plantedDate: timestamp("planted_date").notNull(),
  lastInspection: timestamp("last_inspection"),
  height: decimal("height", { precision: 5, scale: 2 }),
  diameter: decimal("diameter", { precision: 5, scale: 2 }),
  notes: text("notes"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  googleId: varchar("googleId", { length: 255 }).unique(),
  userType: varchar("user_type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});
