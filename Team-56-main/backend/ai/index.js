import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import {
  studentsTable,
  academicRecordsTable,
  assessmentsTable,
  centersTable,
  progressTrackingTable,
} from "../db/schema.js";

const model = google("models/gemini-2.0-flash-exp", {
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

export async function analyzeStudentPerformance(studentId) {
  try {
    const studentData = await getStudentCompleteData(studentId);

    if (!studentData.student) {
      throw new Error("Student not found");
    }

    const analysis = await generateStudentAnalysis(studentData);

    return {
      success: true,
      studentId: studentId,
      analysis: analysis,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error analyzing student performance:", error);
    throw error;
  }
}

async function getStudentCompleteData(studentId) {
  try {
    const student = await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.id, parseInt(studentId)))
      .limit(1);

    if (student.length === 0) {
      return { student: null };
    }

    console.log("Found student:", student[0].name);

    const center = await db
      .select()
      .from(centersTable)
      .where(eq(centersTable.id, student[0].centerId))
      .limit(1);

    const studentWithCenter = {
      ...student[0],
      centerName: center[0]?.name || "Unknown Center",
      centerLocation: center[0]?.address || "Unknown Location",
    };

    const academicRecords = await db
      .select()
      .from(academicRecordsTable)
      .where(eq(academicRecordsTable.studentId, parseInt(studentId)));

    console.log("Found academic records:", academicRecords.length);

    const assessments = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.studentId, parseInt(studentId)));

    console.log("Found assessments:", assessments.length);

    let progressRecords = [];
    try {
      progressRecords = await db
        .select()
        .from(progressTrackingTable)
        .where(eq(progressTrackingTable.studentId, parseInt(studentId)));
      console.log("Found progress records:", progressRecords.length);
    } catch (error) {
      console.log(
        "Progress tracking table not available or error:",
        error.message
      );
      progressRecords = [];
    }

    return {
      student: studentWithCenter,
      academicRecords,
      assessments,
      progressRecords,
    };
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
}

async function generateStudentAnalysis(studentData) {
  const { student, academicRecords, assessments, progressRecords } =
    studentData;

  const academicMetrics = calculateAcademicMetrics(academicRecords);
  const assessmentMetrics = calculateAssessmentMetrics(assessments);

  console.log("Student data for analysis:", {
    studentName: student.name,
    academicRecordsCount: academicRecords.length,
    assessmentsCount: assessments.length,
    progressRecordsCount: progressRecords.length,
  });

  const prompt = `
You are an educational expert analyzing a student's comprehensive performance data for scholarship eligibility and action planning. 

STUDENT PROFILE:
- Name: ${student.name || "Unknown"}
- Age: ${student.age || "Unknown"}
- Grade: ${student.grade || "Unknown"}
- School: ${student.school || "Unknown"}
- Center: ${student.centerName || "Unknown"}
- Family Problems: ${student.familyProblems || "None reported"}

ACADEMIC PERFORMANCE:
${JSON.stringify(academicMetrics, null, 2)}

SKILL ASSESSMENTS:
${JSON.stringify(assessmentMetrics, null, 2)}

PROGRESS TRACKING:
${JSON.stringify(progressRecords, null, 2)}

IMPORTANT: Please respond with ONLY a valid JSON object. Do not include any markdown formatting, code blocks, or additional text. Start your response directly with { and end with }.

{
  "scholarshipEligibility": {
    "eligible": boolean,
    "confidence": "high" | "medium" | "low",
    "criteria": {
      "academicPerformance": {
        "score": number (0-100),
        "status": "excellent" | "good" | "average" | "needs_improvement",
        "details": "string explanation"
      },
      "skillDevelopment": {
        "score": number (0-100),
        "status": "excellent" | "good" | "average" | "needs_improvement", 
        "details": "string explanation"
      },
      "overallProgress": {
        "score": number (0-100),
        "trend": "improving" | "stable" | "declining",
        "details": "string explanation"
      }
    },
    "reasoning": "string - detailed explanation for scholarship decision"
  },
  "actionPlan": {
    "immediate": [
      {
        "priority": "high" | "medium" | "low",
        "action": "string",
        "timeline": "string",
        "expectedOutcome": "string"
      }
    ],
    "shortTerm": [
      {
        "priority": "high" | "medium" | "low", 
        "action": "string",
        "timeline": "string",
        "expectedOutcome": "string"
      }
    ],
    "longTerm": [
      {
        "priority": "high" | "medium" | "low",
        "action": "string", 
        "timeline": "string",
        "expectedOutcome": "string"
      }
    ]
  },
  "areasOfConcern": [
    {
      "area": "string",
      "severity": "high" | "medium" | "low",
      "description": "string",
      "impact": "string",
      "recommendations": ["string array of specific recommendations"]
    }
  ],
  "strengths": [
    {
      "area": "string",
      "description": "string",
      "potential": "string - how to leverage this strength"
    }
  ],
  "riskFactors": [
    {
      "factor": "string",
      "probability": "high" | "medium" | "low",
      "impact": "string",
      "mitigation": "string"
    }
  ],
  "recommendations": {
    "forStudent": ["string array"],
    "forEducator": ["string array"],
    "forFamily": ["string array"],
    "forCenter": ["string array"]
  }
}

Focus on:
1. Academic performance trends and consistency
2. Skill development progress in key areas
3. Socio-economic factors and family challenges
4. Health and wellness indicators
5. Leadership and soft skills development
6. Potential barriers to success
7. Opportunities for improvement
8. Long-term educational pathway

Be comprehensive, actionable, and empathetic in your analysis.`;

  const { text } = await generateText({
    model: model,
    prompt: prompt,
    temperature: 0.3,
    maxTokens: 4000,
  });

  try {
    let cleanedText = text.trim();

    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "");
    }
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "");
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.replace(/\s*```$/, "");
    }

    console.log("Cleaned AI response:", cleanedText.substring(0, 200) + "...");

    const analysis = JSON.parse(cleanedText);
    return analysis;
  } catch (parseError) {
    console.error("Error parsing AI response:", parseError);
    console.error("Raw AI response:", text);
    return createFallbackAnalysis(studentData);
  }
}

function calculateAcademicMetrics(academicRecords) {
  if (academicRecords.length === 0) {
    return { message: "No academic records available" };
  }

  const metrics = {
    totalRecords: academicRecords.length,
    subjects: {},
    overallAverage: 0,
    trends: {},
  };

  let totalMarks = 0;
  let totalMaxMarks = 0;

  academicRecords.forEach((record) => {
    const subject = record.subjectName;
    const percentage = (record.marks / record.maxMarks) * 100;

    if (!metrics.subjects[subject]) {
      metrics.subjects[subject] = {
        records: [],
        average: 0,
        trend: "stable",
      };
    }

    metrics.subjects[subject].records.push({
      term: record.term,
      year: record.academicYear,
      percentage: percentage,
      marks: record.marks,
      maxMarks: record.maxMarks,
    });

    totalMarks += record.marks;
    totalMaxMarks += record.maxMarks;
  });

  metrics.overallAverage =
    totalMaxMarks > 0 ? (totalMarks / totalMaxMarks) * 100 : 0;

  Object.keys(metrics.subjects).forEach((subject) => {
    const records = metrics.subjects[subject].records;
    const total = records.reduce((sum, record) => sum + record.percentage, 0);
    metrics.subjects[subject].average = total / records.length;

    if (records.length > 1) {
      const midPoint = Math.floor(records.length / 2);
      const firstHalf = records.slice(0, midPoint);
      const secondHalf = records.slice(midPoint);

      const firstAvg =
        firstHalf.reduce((sum, r) => sum + r.percentage, 0) / firstHalf.length;
      const secondAvg =
        secondHalf.reduce((sum, r) => sum + r.percentage, 0) /
        secondHalf.length;

      if (secondAvg > firstAvg + 5) {
        metrics.subjects[subject].trend = "improving";
      } else if (firstAvg > secondAvg + 5) {
        metrics.subjects[subject].trend = "declining";
      }
    }
  });

  return metrics;
}

function calculateAssessmentMetrics(assessments) {
  if (assessments.length === 0) {
    return { message: "No assessment data available" };
  }

  const latest = assessments[assessments.length - 1];

  const metrics = {
    latestAssessment: {
      date: latest.assessmentDate,
      type: latest.assessmentType,
    },
    skills: {},
    healthMetrics: {},
    overallSkillAverage: 0,
  };

  const skillFields = [
    "leadershipScore",
    "generalKnowledgeScore",
    "englishSpeakingScore",
    "englishReadingScore",
    "englishWritingScore",
    "communicationScore",
    "teamworkScore",
    "creativityScore",
  ];

  let skillSum = 0;
  let skillCount = 0;

  skillFields.forEach((field) => {
    if (latest[field] !== null && latest[field] !== undefined) {
      metrics.skills[field] = latest[field];
      skillSum += latest[field];
      skillCount++;
    }
  });

  metrics.overallSkillAverage = skillCount > 0 ? skillSum / skillCount : 0;

  if (latest.weight && latest.height) {
    metrics.healthMetrics = {
      weight: latest.weight,
      height: latest.height,
      bmi: latest.bmi,
      healthNotes: latest.healthNotes,
    };
  }

  return metrics;
}

function createFallbackAnalysis(studentData) {
  return {
    scholarshipEligibility: {
      eligible: false,
      confidence: "low",
      criteria: {
        academicPerformance: {
          score: 0,
          status: "needs_improvement",
          details: "Unable to analyze - insufficient data",
        },
        skillDevelopment: {
          score: 0,
          status: "needs_improvement",
          details: "Unable to analyze - insufficient data",
        },
        overallProgress: {
          score: 0,
          trend: "stable",
          details: "Unable to analyze - insufficient data",
        },
      },
      reasoning:
        "Analysis failed due to data processing error. Manual review required.",
    },
    actionPlan: {
      immediate: [
        {
          priority: "high",
          action: "Conduct comprehensive manual assessment",
          timeline: "1 week",
          expectedOutcome: "Complete student profile data",
        },
      ],
      shortTerm: [],
      longTerm: [],
    },
    areasOfConcern: [
      {
        area: "Data Quality",
        severity: "high",
        description: "Insufficient or corrupted student data",
        impact: "Cannot perform accurate assessment",
        recommendations: [
          "Review and update student records",
          "Conduct fresh assessments",
        ],
      },
    ],
    strengths: [],
    riskFactors: [],
    recommendations: {
      forStudent: ["Continue attending classes regularly"],
      forEducator: ["Update student assessment records"],
      forFamily: ["Support student's educational journey"],
      forCenter: ["Improve data collection processes"],
    },
  };
}
