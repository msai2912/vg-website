import initSqlJs from "sql.js";

class OfflineStorage {
  constructor() {
    this.db = null;
    this.isOnline = navigator.onLine;
    this.listeners = [];
    this.initPromise = this.init();

    window.addEventListener("online", () => {
      this.isOnline = true;
      this.notifyListeners("online");
      this.syncWhenOnline();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.notifyListeners("offline");
    });
  }

  async init() {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      const savedDb = localStorage.getItem("offlineDB");
      if (savedDb) {
        const uInt8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new SQL.Database(uInt8Array);
      } else {
        this.db = new SQL.Database();
      }

      this.createTables();
      console.log("SQLite database initialized");
    } catch (error) {
      console.error("Failed to initialize SQLite:", error);
    }
  }

  createTables() {
    const sql = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        server_id INTEGER,
        name TEXT NOT NULL,
        age INTEGER,
        contact TEXT,
        grade INTEGER,
        center_id INTEGER,
        school TEXT,
        address TEXT,
        guardian_name TEXT,
        guardian_contact TEXT,
        family_problems TEXT,
        caste TEXT,
        is_synced INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS academic_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        server_id INTEGER,
        student_id INTEGER,
        subject_name TEXT,
        marks INTEGER,
        max_marks INTEGER,
        grade INTEGER,
        term TEXT,
        academic_year TEXT,
        remarks TEXT,
        is_synced INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        server_id INTEGER,
        student_id INTEGER,
        leadership_score INTEGER,
        leadership_notes TEXT,
        weight REAL,
        height REAL,
        bmi REAL,
        health_notes TEXT,
        gk_score INTEGER,
        english_speaking_score INTEGER,
        english_reading_score INTEGER,
        english_writing_score INTEGER,
        communication_score INTEGER,
        teamwork_score INTEGER,
        creativity_score INTEGER,
        assessment_type TEXT DEFAULT 'initial',
        overall_notes TEXT,
        is_synced INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    this.db.exec(sql);
    this.saveToStorage();
  }

  saveToStorage() {
    if (this.db) {
      const data = this.db.export();
      localStorage.setItem("offlineDB", JSON.stringify(Array.from(data)));
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(status) {
    this.listeners.forEach((callback) => callback(status));
  }

  async addStudent(studentData) {
    await this.initPromise;

    try {
      if (this.isOnline) {
        const response = await fetch(
          "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/students",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(studentData),
          }
        );

        if (response.ok) {
          const result = await response.json();

          const stmt = this.db.prepare(`
            INSERT INTO students (server_id, name, age, contact, grade, center_id, school, address, guardian_name, guardian_contact, family_problems, caste, is_synced)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
          `);

          stmt.run([
            result.student.id,
            result.student.name,
            result.student.age,
            result.student.contact,
            result.student.grade,
            result.student.centerId,
            result.student.school || "",
            result.student.address || "",
            result.student.guardianName || "",
            result.student.guardianContact || "",
            result.student.familyProblems || "",
            result.student.caste || "",
          ]);

          stmt.free();
          this.saveToStorage();

          return { success: true, student: result.student, online: true };
        }
      }

      const stmt = this.db.prepare(`
        INSERT INTO students (name, age, contact, grade, center_id, school, address, guardian_name, guardian_contact, family_problems, caste, is_synced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `);

      const result = stmt.run([
        studentData.name,
        studentData.age,
        studentData.contact,
        studentData.grade,
        studentData.centerId,
        studentData.school || "",
        studentData.address || "",
        studentData.guardianName || "",
        studentData.guardianContact || "",
        studentData.familyProblems || "",
        studentData.caste || "",
      ]);

      stmt.free();
      this.saveToStorage();

      return {
        success: true,
        student: { ...studentData, id: result.lastInsertRowid },
        online: false,
      };
    } catch (error) {
      console.error("Error adding student:", error);
      return { success: false, message: error.message };
    }
  }

  async getStudents() {
    await this.initPromise;

    try {
      const stmt = this.db.prepare(
        "SELECT * FROM students ORDER BY created_at DESC"
      );
      const students = [];

      while (stmt.step()) {
        const row = stmt.getAsObject();
        students.push({
          id: row.server_id || row.id,
          name: row.name,
          age: row.age,
          contact: row.contact,
          grade: row.grade,
          centerId: row.center_id,
          school: row.school,
          address: row.address,
          guardianName: row.guardian_name,
          guardianContact: row.guardian_contact,
          familyProblems: row.family_problems,
          caste: row.caste,
          isOffline: !row.is_synced,
          createdAt: row.created_at,
        });
      }

      stmt.free();

      if (this.isOnline) {
        this.syncWhenOnline().catch(console.warn);
      }

      return { success: true, students };
    } catch (error) {
      console.error("Error getting students:", error);
      return { success: false, message: error.message };
    }
  }

  async addAcademicRecord(studentId, recordData) {
    await this.initPromise;

    try {
      if (this.isOnline) {
        const response = await fetch(
          `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/students/${studentId}/academics`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(recordData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          return { success: true, record: result.record, online: true };
        }
      }

      const stmt = this.db.prepare(`
        INSERT INTO academic_records (student_id, subject_name, marks, max_marks, grade, term, academic_year, remarks, is_synced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
      `);

      const result = stmt.run([
        studentId,
        recordData.subjectName,
        recordData.marks,
        recordData.maxMarks,
        recordData.grade,
        recordData.term || "",
        recordData.academicYear || "",
        recordData.remarks || "",
      ]);

      stmt.free();
      this.saveToStorage();

      return {
        success: true,
        record: { ...recordData, id: result.lastInsertRowid },
        online: false,
      };
    } catch (error) {
      console.error("Error adding academic record:", error);
      return { success: false, message: error.message };
    }
  }

  async addAssessment(studentId, assessmentData) {
    await this.initPromise;

    try {
      if (this.isOnline) {
        const response = await fetch(
          `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/students/${studentId}/assessment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(assessmentData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          return { success: true, assessment: result.assessment, online: true };
        }
      }

      const stmt = this.db.prepare(`
        INSERT INTO assessments (student_id, leadership_score, leadership_notes, weight, height, bmi, health_notes, gk_score, english_speaking_score, english_reading_score, english_writing_score, communication_score, teamwork_score, creativity_score, assessment_type, overall_notes, is_synced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `);

      const result = stmt.run([
        studentId,
        assessmentData.leadershipScore || null,
        assessmentData.leadershipNotes || "",
        assessmentData.weight || null,
        assessmentData.height || null,
        assessmentData.bmi || null,
        assessmentData.healthNotes || "",
        assessmentData.generalKnowledgeScore || null,
        assessmentData.englishSpeakingScore || null,
        assessmentData.englishReadingScore || null,
        assessmentData.englishWritingScore || null,
        assessmentData.communicationScore || null,
        assessmentData.teamworkScore || null,
        assessmentData.creativityScore || null,
        assessmentData.assessmentType || "initial",
        assessmentData.overallNotes || "",
      ]);

      stmt.free();
      this.saveToStorage();

      return {
        success: true,
        assessment: { ...assessmentData, id: result.lastInsertRowid },
        online: false,
      };
    } catch (error) {
      console.error("Error adding assessment:", error);
      return { success: false, message: error.message };
    }
  }

  async getSyncStatus() {
    await this.initPromise;

    try {
      const stmt = this.db.prepare(
        "SELECT COUNT(*) as count FROM students WHERE is_synced = 0"
      );
      stmt.step();
      const unsyncedStudents = stmt.getAsObject().count;
      stmt.free();

      const stmt2 = this.db.prepare(
        "SELECT COUNT(*) as count FROM academic_records WHERE is_synced = 0"
      );
      stmt2.step();
      const unsyncedRecords = stmt2.getAsObject().count;
      stmt2.free();

      const stmt3 = this.db.prepare(
        "SELECT COUNT(*) as count FROM assessments WHERE is_synced = 0"
      );
      stmt3.step();
      const unsyncedAssessments = stmt3.getAsObject().count;
      stmt3.free();

      return {
        isOnline: this.isOnline,
        unsyncedItems: unsyncedStudents + unsyncedRecords + unsyncedAssessments,
        details: {
          students: unsyncedStudents,
          records: unsyncedRecords,
          assessments: unsyncedAssessments,
        },
      };
    } catch (error) {
      console.error("Error getting sync status:", error);
      return { isOnline: this.isOnline, unsyncedItems: 0, details: {} };
    }
  }

  async syncWhenOnline() {
    if (!this.isOnline) return;

    try {
      console.log("Starting sync...");

      const stmt = this.db.prepare(
        "SELECT * FROM students WHERE is_synced = 0"
      );
      const studentsToSync = [];

      while (stmt.step()) {
        studentsToSync.push(stmt.getAsObject());
      }
      stmt.free();

      for (const student of studentsToSync) {
        try {
          const response = await fetch(
            "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/students",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                name: student.name,
                age: student.age,
                contact: student.contact,
                grade: student.grade,
                centerId: student.center_id,
                school: student.school,
                address: student.address,
                guardianName: student.guardian_name,
                guardianContact: student.guardian_contact,
                familyProblems: student.family_problems,
                caste: student.caste,
              }),
            }
          );

          if (response.ok) {
            const result = await response.json();

            const updateStmt = this.db.prepare(
              "UPDATE students SET server_id = ?, is_synced = 1 WHERE id = ?"
            );
            updateStmt.run([result.student.id, student.id]);
            updateStmt.free();

            console.log(`Synced student: ${student.name}`);
          }
        } catch (error) {
          console.error(`Failed to sync student ${student.name}:`, error);
        }
      }

      this.saveToStorage();
      console.log("Sync completed");
    } catch (error) {
      console.error("Sync error:", error);
    }
  }

  async clearDatabase() {
    await this.initPromise;

    try {
      this.db.exec(`
        DELETE FROM students;
        DELETE FROM academic_records;
        DELETE FROM assessments;
      `);

      this.saveToStorage();
      return { success: true };
    } catch (error) {
      console.error("Error clearing database:", error);
      return { success: false, message: error.message };
    }
  }
}

export const offlineStorage = new OfflineStorage();

export const offlineStorageManager = offlineStorage;
export const networkManager = offlineStorage;

export default offlineStorage;
