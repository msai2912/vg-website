import bcrypt from "bcrypt";
import db from "../db/index.js";
import {
  programManagersTable,
  centersTable,
  communityEducatorsTable,
  studentsTable,
  academicRecordsTable,
  assessmentsTable,
  progressTrackingTable,
} from "../db/schema.js";

const seedDatabase = async () => {
  console.log("🌱 Starting database seeding...");

  try {
    console.log("📋 Creating Program Managers...");
    const programManagers = await db
      .insert(programManagersTable)
      .values([
        {
          name: "Rajesh Kumar",
          email: "rajesh@afterschool.org",
          password: await bcrypt.hash("password123", 10),
          phone: "+91-9876543210",
        },
        {
          name: "Priya Sharma",
          email: "priya@afterschool.org",
          password: await bcrypt.hash("password123", 10),
          phone: "+91-9876543211",
        },
      ])
      .returning();

    console.log(`✅ Created ${programManagers.length} Program Managers`);

    console.log("🏫 Creating Centers...");
    const centers = await db
      .insert(centersTable)
      .values([
        {
          name: "Sunrise Learning Center",
          address: "Village Rampur, Block Sadar, District Varanasi, UP",
          phone: "+91-9876543220",
          email: "sunrise@afterschool.org",
          programManagerId: programManagers[0].id,
          capacity: 50,
        },
        {
          name: "Shiksha Kendra",
          address: "Village Govindpur, Block Pindra, District Varanasi, UP",
          phone: "+91-9876543221",
          email: "shiksha@afterschool.org",
          programManagerId: programManagers[0].id,
          capacity: 40,
        },
        {
          name: "Vidya Vihar Center",
          address: "Village Newada, Block Cholapur, District Varanasi, UP",
          phone: "+91-9876543222",
          email: "vidya@afterschool.org",
          programManagerId: programManagers[1].id,
          capacity: 60,
        },
      ])
      .returning();

    console.log(`✅ Created ${centers.length} Centers`);

    console.log("👩‍🏫 Creating Community Educators...");
    const educators = await db
      .insert(communityEducatorsTable)
      .values([
        {
          name: "Sunita Devi",
          email: "sunita@afterschool.org",
          password: await bcrypt.hash("educator123", 10),
          phone: "+91-9876543230",
          centerId: centers[0].id,
          qualifications: "B.Ed, MA in Hindi",
          specialization: "Language Development",
        },
        {
          name: "Amit Singh",
          email: "amit@afterschool.org",
          password: await bcrypt.hash("educator123", 10),
          phone: "+91-9876543231",
          centerId: centers[0].id,
          qualifications: "BSc, B.Ed",
          specialization: "Mathematics & Science",
        },
        {
          name: "Kavita Mishra",
          email: "kavita@afterschool.org",
          password: await bcrypt.hash("educator123", 10),
          phone: "+91-9876543232",
          centerId: centers[1].id,
          qualifications: "BA, B.Ed",
          specialization: "Social Studies",
        },
        {
          name: "Ravi Kumar",
          email: "ravi@afterschool.org",
          password: await bcrypt.hash("educator123", 10),
          phone: "+91-9876543233",
          centerId: centers[2].id,
          qualifications: "MA English, B.Ed",
          specialization: "English Communication",
        },
      ])
      .returning();

    console.log(`✅ Created ${educators.length} Community Educators`);

    console.log("👦👧 Creating Students...");
    const students = await db
      .insert(studentsTable)
      .values([
        {
          name: "Aarav Gupta",
          age: 12,
          contact: "9876540001",
          caste: "General",
          grade: 7,
          school: "Government Primary School Rampur",
          address: "House No. 45, Rampur Village, Varanasi",
          centerId: centers[0].id,
          guardianName: "Mohan Gupta",
          guardianContact: "9876540101",
          familyProblems:
            "Father works as daily wage laborer, irregular income",
        },
        {
          name: "Priya Singh",
          age: 10,
          contact: "9876540002",
          caste: "OBC",
          grade: 5,
          school: "Government Primary School Rampur",
          address: "House No. 23, Rampur Village, Varanasi",
          centerId: centers[0].id,
          guardianName: "Sita Singh",
          guardianContact: "9876540102",
          familyProblems: null,
        },
        {
          name: "Rohit Kumar",
          age: 14,
          contact: "9876540003",
          caste: "SC",
          grade: 9,
          school: "Government High School Rampur",
          address: "House No. 12, Rampur Village, Varanasi",
          centerId: centers[0].id,
          guardianName: "Ram Kumar",
          guardianContact: "9876540103",
          familyProblems:
            "Single parent household, mother works as domestic help",
        },
        {
          name: "Ankit Sharma",
          age: 11,
          contact: "9876540004",
          caste: "General",
          grade: 6,
          school: "Government Middle School Govindpur",
          address: "House No. 78, Govindpur Village, Varanasi",
          centerId: centers[1].id,
          guardianName: "Vikash Sharma",
          guardianContact: "9876540104",
          familyProblems: null,
        },
        {
          name: "Pooja Devi",
          age: 13,
          contact: "9876540005",
          caste: "OBC",
          grade: 8,
          school: "Government High School Govindpur",
          address: "House No. 56, Govindpur Village, Varanasi",
          centerId: centers[1].id,
          guardianName: "Sunita Devi",
          guardianContact: "9876540105",
          familyProblems: "Large family with 5 children, economic difficulties",
        },
        {
          name: "Sanjay Yadav",
          age: 15,
          contact: "9876540006",
          caste: "OBC",
          grade: 10,
          school: "Government Higher Secondary School Newada",
          address: "House No. 34, Newada Village, Varanasi",
          centerId: centers[2].id,
          guardianName: "Ramesh Yadav",
          guardianContact: "9876540106",
          familyProblems: null,
        },
        {
          name: "Meera Verma",
          age: 9,
          contact: "9876540007",
          caste: "General",
          grade: 4,
          school: "Government Primary School Newada",
          address: "House No. 89, Newada Village, Varanasi",
          centerId: centers[2].id,
          guardianName: "Krishna Verma",
          guardianContact: "9876540107",
          familyProblems: "Father has health issues, irregular work",
        },
        {
          name: "Arjun Pandey",
          age: 12,
          contact: "9876540008",
          caste: "General",
          grade: 7,
          school: "Government Middle School Newada",
          address: "House No. 67, Newada Village, Varanasi",
          centerId: centers[2].id,
          guardianName: "Shyam Pandey",
          guardianContact: "9876540108",
          familyProblems: null,
        },
      ])
      .returning();

    console.log(`✅ Created ${students.length} Students`);

    console.log("📚 Creating Academic Records...");
    const academicRecords = [];

    for (const student of students) {
      const subjects = [
        "Hindi",
        "English",
        "Mathematics",
        "Science",
        "Social Studies",
      ];
      const terms = ["Term 1", "Term 2"];

      for (const term of terms) {
        for (const subject of subjects) {
          const baseMarks = Math.floor(Math.random() * 30) + 50;
          const marks = Math.min(100, baseMarks + (student.grade > 7 ? 10 : 0));
          academicRecords.push({
            studentId: student.id,
            grade: student.grade,
            subjectName: subject,
            marks: marks,
            maxMarks: 100,
            term: term,
            academicYear: "2024-25",
            educatorId: educators.find((e) => e.centerId === student.centerId)
              ?.id,
            remarks:
              marks > 75
                ? "Excellent performance"
                : marks > 60
                ? "Good effort"
                : "Needs improvement",
          });
        }
      }
    }

    await db.insert(academicRecordsTable).values(academicRecords);
    console.log(`✅ Created ${academicRecords.length} Academic Records`);

    console.log("📊 Creating Assessments...");
    const assessments = [];

    for (const student of students) {
      assessments.push({
        studentId: student.id,
        leadershipScore: Math.floor(Math.random() * 40) + 60,
        leadershipNotes: "Shows good initiative in group activities",
        weight: (student.age * 3.5 + Math.random() * 5).toFixed(1),
        height: (student.age * 6 + 100 + Math.random() * 10).toFixed(1),
        generalKnowledgeScore: Math.floor(Math.random() * 30) + 50,
        englishSpeakingScore: Math.floor(Math.random() * 40) + 40,
        englishReadingScore: Math.floor(Math.random() * 40) + 45,
        englishWritingScore: Math.floor(Math.random() * 35) + 35,
        communicationScore: Math.floor(Math.random() * 30) + 50,
        teamworkScore: Math.floor(Math.random() * 35) + 55,
        creativityScore: Math.floor(Math.random() * 40) + 45,
        assessmentType: "quarterly",
        educatorId: educators.find((e) => e.centerId === student.centerId)?.id,
        overallNotes: "Regular student showing steady progress",
      });
    }

    await db.insert(assessmentsTable).values(assessments);
    console.log(`✅ Created ${assessments.length} Assessments`);

    console.log("📈 Creating Progress Tracking Records...");
    const progressRecords = [];

    const categories = ["leadership", "health", "english_speaking", "sports"];
    const skills = {
      leadership: ["Team Leadership", "Public Speaking", "Decision Making"],
      health: ["Physical Fitness", "Nutrition Awareness", "Mental Health"],
      english_speaking: ["Pronunciation", "Vocabulary", "Conversation"],
      sports: ["Cricket", "Kabaddi", "Running"],
    };

    for (const student of students) {
      const numRecords = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < numRecords; i++) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        const skillList = skills[category];
        const skill = skillList[Math.floor(Math.random() * skillList.length)];
        const levels = ["Beginner", "Intermediate", "Advanced"];
        const level = levels[Math.floor(Math.random() * levels.length)];

        progressRecords.push({
          studentId: student.id,
          category: category,
          skillName: skill,
          level: level,
          notes: `Student shows ${level.toLowerCase()} level skills in ${skill.toLowerCase()}`,
          educatorId: educators.find((e) => e.centerId === student.centerId)
            ?.id,
        });
      }
    }

    await db.insert(progressTrackingTable).values(progressRecords);
    console.log(
      `✅ Created ${progressRecords.length} Progress Tracking Records`
    );

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Test Credentials:");
    console.log("===================");
    console.log("\nProgram Managers:");
    console.log("• Email: rajesh@afterschool.org | Password: password123");
    console.log("• Email: priya@afterschool.org | Password: password123");
    console.log("\nEducators:");
    console.log("• Email: sunita@afterschool.org | Password: educator123");
    console.log("• Email: amit@afterschool.org | Password: educator123");
    console.log("• Email: kavita@afterschool.org | Password: educator123");
    console.log("• Email: ravi@afterschool.org | Password: educator123");
    console.log("\nStudents (login with contact number):");
    students.forEach((student, index) => {
      console.log(`• Contact: ${student.contact} | Name: ${student.name}`);
    });
    console.log(
      "\n💡 Students don't need passwords - they login with just their contact number!"
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase()
  .then(() => {
    console.log("🏁 Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });
