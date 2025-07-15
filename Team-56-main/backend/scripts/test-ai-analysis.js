import { analyzeStudentPerformance } from "../ai/index.js";
import dotenv from "dotenv";

dotenv.config();

async function testAIAnalysis() {
  console.log("Testing AI Analysis System...");

  const testStudentId = 1;
  try {
    console.log(`\nAnalyzing student ID: ${testStudentId}`);
    console.log("This may take a moment...\n");

    const analysis = await analyzeStudentPerformance(testStudentId);

    console.log("=== AI ANALYSIS RESULTS ===");
    console.log(JSON.stringify(analysis, null, 2));

    console.log("\n=== VALIDATION ===");
    console.log("✓ Analysis completed successfully");
    console.log(`✓ Student ID: ${analysis.studentId}`);
    console.log(`✓ Generated at: ${analysis.generatedAt}`);
    console.log(
      `✓ Scholarship eligible: ${analysis.analysis.scholarshipEligibility.eligible}`
    );
    console.log(
      `✓ Confidence level: ${analysis.analysis.scholarshipEligibility.confidence}`
    );
    console.log(
      `✓ Number of action items: ${
        analysis.analysis.actionPlan.immediate.length +
        analysis.analysis.actionPlan.shortTerm.length +
        analysis.analysis.actionPlan.longTerm.length
      }`
    );
    console.log(
      `✓ Areas of concern: ${analysis.analysis.areasOfConcern.length}`
    );
    console.log(
      `✓ Strengths identified: ${analysis.analysis.strengths.length}`
    );
  } catch (error) {
    console.error("❌ Error during analysis:", error.message);

    if (error.message.includes("Student not found")) {
      console.log(
        "\n💡 Tip: Make sure you have at least one student in your database"
      );
      console.log("You can run: npm run seed");
    }

    if (error.message.includes("API key")) {
      console.log(
        "\n💡 Tip: Make sure you have set GOOGLE_AI_API_KEY in your .env file"
      );
      console.log(
        "Get your API key from: https://aistudio.google.com/app/apikey"
      );
    }
  }
}

testAIAnalysis();
