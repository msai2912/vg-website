import express from "express";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import {
  studentsTable,
  centersTable,
  communityEducatorsTable,
  academicRecordsTable,
  assessmentsTable,
} from "../db/schema.js";
import { analyzeStudentPerformance } from "../ai/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    age,
    contact,
    caste,
    grade,
    school,
    address,
    centerId,
    guardianName,
    guardianContact,
    familyProblems,
  } = req.body;

  try {
    if (req.user.role === "educator") {
      const educator = await db
        .select()
        .from(communityEducatorsTable)
        .where(eq(communityEducatorsTable.id, req.user.entityId))
        .limit(1);

      if (educator[0].centerId !== centerId) {
        return res
          .status(403)
          .json({ message: "Cannot add students to other centers" });
      }
    }

    const newStudent = await db
      .insert(studentsTable)
      .values({
        name,
        age,
        contact,
        caste,
        grade,
        school,
        address,
        centerId,
        guardianName,
        guardianContact,
        familyProblems,
      })
      .returning()
      .execute();

    res.json({
      message: "Student added successfully",
      student: newStudent[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

router.get("/", async (req, res) => {
  try {
    let students;

    students = await db
      .select({
        id: studentsTable.id,
        name: studentsTable.name,
        age: studentsTable.age,
        contact: studentsTable.contact,
        caste: studentsTable.caste,
        grade: studentsTable.grade,
        school: studentsTable.school,
        address: studentsTable.address,
        centerId: studentsTable.centerId,
        guardianName: studentsTable.guardianName,
        guardianContact: studentsTable.guardianContact,
        familyProblems: studentsTable.familyProblems,
        enrollmentDate: studentsTable.enrollmentDate,
        isActive: studentsTable.isActive,
        createdAt: studentsTable.createdAt,
        updatedAt: studentsTable.updatedAt,
      })
      .from(studentsTable)
      .where(eq(studentsTable.isActive, 1));

    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.id, parseInt(studentId)))
      .limit(1);

    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ student: student[0] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
});

router.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const updateData = req.body;

  try {
    const updatedStudent = await db
      .update(studentsTable)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(studentsTable.id, parseInt(studentId)))
      .returning()
      .execute();

    res.json({
      message: "Student updated successfully",
      student: updatedStudent[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

router.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await db
      .update(studentsTable)
      .set({ isActive: 0 })
      .where(eq(studentsTable.id, parseInt(studentId)))
      .execute();

    res.json({ message: "Student deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deactivating student", error });
  }
});

router.post("/:studentId/academics", async (req, res) => {
  const { studentId } = req.params;
  const { grade, subjectName, marks, maxMarks, term, academicYear, remarks } =
    req.body;

  try {
    const newRecord = await db
      .insert(academicRecordsTable)
      .values({
        studentId: parseInt(studentId),
        grade: parseInt(grade),
        subjectName,
        marks: parseInt(marks),
        maxMarks: parseInt(maxMarks),
        term,
        academicYear,
        educatorId: req.user.role === "educator" ? req.user.entityId : null,
        remarks,
      })
      .returning()
      .execute();

    res.json({
      message: "Academic record added successfully",
      record: newRecord[0],
    });
  } catch (error) {
    console.error("Error adding academic record:", error);
    res.status(500).json({ message: "Error adding academic record", error });
  }
});

router.get("/:studentId/academics", async (req, res) => {
  const { studentId } = req.params;

  try {
    const records = await db
      .select()
      .from(academicRecordsTable)
      .where(eq(academicRecordsTable.studentId, parseInt(studentId)));

    res.json({ records });
  } catch (error) {
    res.status(500).json({ message: "Error fetching academic records", error });
  }
});

router.put("/:studentId/academics/:recordId", async (req, res) => {
  const { recordId } = req.params;
  const updateData = req.body;

  try {
    const updatedRecord = await db
      .update(academicRecordsTable)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(academicRecordsTable.id, recordId))
      .returning()
      .execute();

    res.json({
      message: "Academic record updated successfully",
      record: updatedRecord[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating academic record", error });
  }
});

router.post("/:studentId/assessment", async (req, res) => {
  const { studentId } = req.params;
  const assessmentData = req.body;

  try {
    const processedData = { ...assessmentData };
    if (processedData.assessmentDate) {
      processedData.assessmentDate = new Date(processedData.assessmentDate);
    }

    const numericFields = [
      "leadershipScore",
      "weight",
      "height",
      "generalKnowledgeScore",
      "englishSpeakingScore",
      "englishReadingScore",
      "englishWritingScore",
      "communicationScore",
      "teamworkScore",
      "creativityScore",
    ];

    numericFields.forEach((field) => {
      if (processedData[field] !== undefined && processedData[field] !== "") {
        processedData[field] = Number(processedData[field]);
      }
    });

    const newAssessment = await db
      .insert(assessmentsTable)
      .values({
        studentId: parseInt(studentId),
        educatorId: req.user.role === "educator" ? req.user.entityId : null,
        ...processedData,
      })
      .returning()
      .execute();

    res.json({
      message: "Assessment added successfully",
      assessment: newAssessment[0],
    });
  } catch (error) {
    console.error("Error adding assessment:", error);
    res.status(500).json({ message: "Error adding assessment", error });
  }
});

router.get("/:studentId/assessment", async (req, res) => {
  const { studentId } = req.params;

  try {
    const assessments = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.studentId, parseInt(studentId)))
      .orderBy(assessmentsTable.assessmentDate);

    res.json({ assessments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments", error });
  }
});

router.put("/:studentId/assessment/:assessmentId", async (req, res) => {
  const { assessmentId } = req.params;
  const updateData = req.body;

  try {
    const updatedAssessment = await db
      .update(assessmentsTable)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(assessmentsTable.id, assessmentId))
      .returning()
      .execute();

    res.json({
      message: "Assessment updated successfully",
      assessment: updatedAssessment[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating assessment", error });
  }
});

router.post("/:studentId/analyze", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.id, parseInt(studentId)))
      .limit(1);

    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const academicRecords = await db
      .select()
      .from(academicRecordsTable)
      .where(eq(academicRecordsTable.studentId, parseInt(studentId)));

    const assessments = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.studentId, parseInt(studentId)))
      .orderBy(assessmentsTable.assessmentDate);

    const analysisResult = await analyzeStudentPerformance({
      student: student[0],
      academicRecords,
      assessments,
    });

    res.json({ analysis: analysisResult });
  } catch (error) {
    console.error("Error analyzing student performance:", error);
    res
      .status(500)
      .json({ message: "Error analyzing student performance", error });
  }
});

router.get("/:studentId/ai-analysis", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await db
      .select()
      .from(studentsTable)
      .innerJoin(centersTable, eq(studentsTable.centerId, centersTable.id))
      .where(eq(studentsTable.id, parseInt(studentId)))
      .limit(1);

    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const analysis = await analyzeStudentPerformance(studentId);

    res.json({
      message: "AI analysis completed successfully",
      ...analysis,
    });
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    res.status(500).json({
      message: "Error generating AI analysis",
      error: error.message,
    });
  }
});

export default router;
