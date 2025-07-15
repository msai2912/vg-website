import bcrypt from "bcrypt";
import db from "../db/index.js";
import {
  treesTable,
  centersTable,
  studentsTable,
  communityEducatorsTable,
} from "../db/schema.js";

const seedTrees = async () => {
  console.log("🌳 Starting tree seeding...");

  try {
    const existingTrees = await db.select().from(treesTable).limit(1);
    if (existingTrees.length > 0) {
      console.log(
        "⚠️  Trees already exist in database. Clearing existing trees..."
      );
      await db.delete(treesTable);
      console.log("✅ Cleared existing trees");
    }

    const centers = await db.select().from(centersTable);
    const students = await db.select().from(studentsTable);
    const educators = await db.select().from(communityEducatorsTable);

    console.log("📊 Creating tree data...");

    const tamilNaduDistricts = [
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
      { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
      { name: "Madurai", lat: 9.9252, lng: 78.1198 },
      { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
      { name: "Salem", lat: 11.664, lng: 78.146 },
      { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
      { name: "Vellore", lat: 12.9165, lng: 79.1325 },
      { name: "Erode", lat: 11.341, lng: 77.7172 },
      { name: "Dindigul", lat: 10.3673, lng: 77.9803 },
      { name: "Thanjavur", lat: 10.787, lng: 79.1378 },
      { name: "Kanchipuram", lat: 12.8185, lng: 79.7036 },
      { name: "Cuddalore", lat: 11.748, lng: 79.7714 },
      { name: "Thoothukudi", lat: 8.7642, lng: 78.1348 },
      { name: "Nagapattinam", lat: 10.7661, lng: 79.8424 },
      { name: "Villupuram", lat: 11.9401, lng: 79.4861 },
    ];

    const treeTypes = [
      { type: "Neem", species: "Azadirachta indica" },
      { type: "Banyan", species: "Ficus benghalensis" },
      { type: "Peepal", species: "Ficus religiosa" },
      { type: "Mango", species: "Mangifera indica" },
      { type: "Coconut", species: "Cocos nucifera" },
      { type: "Tamarind", species: "Tamarindus indica" },
      { type: "Gulmohar", species: "Delonix regia" },
      { type: "Eucalyptus", species: "Eucalyptus globulus" },
      { type: "Teak", species: "Tectona grandis" },
      { type: "Mahogany", species: "Swietenia mahagoni" },
      { type: "Jackfruit", species: "Artocarpus heterophyllus" },
      { type: "Drumstick", species: "Moringa oleifera" },
      { type: "Jamun", species: "Syzygium cumini" },
      { type: "Guava", species: "Psidium guajava" },
      { type: "Papaya", species: "Carica papaya" },
    ];

    const statuses = ["planted", "growing", "mature"];
    const healthStatuses = ["healthy", "diseased", "pest_affected"];
    const plantedByTypes = ["student", "educator", "center", "volunteer"];

    const trees = [];

    for (let i = 0; i < 75; i++) {
      const district =
        tamilNaduDistricts[
          Math.floor(Math.random() * tamilNaduDistricts.length)
        ];
      const treeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const healthStatus =
        healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
      const plantedByType =
        plantedByTypes[Math.floor(Math.random() * plantedByTypes.length)];

      const latOffset = (Math.random() - 0.5) * 0.3;
      const lngOffset = (Math.random() - 0.5) * 0.3;

      let plantedBy = "Community Volunteer";
      let plantedByRef = null;
      let centerId = null;

      if (plantedByType === "student" && students.length > 0) {
        const student = students[Math.floor(Math.random() * students.length)];
        plantedBy = student.name;
        plantedByRef = student.id;
        centerId = student.centerId;
      } else if (plantedByType === "educator" && educators.length > 0) {
        const educator =
          educators[Math.floor(Math.random() * educators.length)];
        plantedBy = educator.name;
        plantedByRef = educator.id;
        centerId = educator.centerId;
      } else if (plantedByType === "center" && centers.length > 0) {
        const center = centers[Math.floor(Math.random() * centers.length)];
        plantedBy = center.name;
        plantedByRef = center.id;
        centerId = center.id;
      }

      const plantedDate = new Date();
      plantedDate.setDate(
        plantedDate.getDate() - Math.floor(Math.random() * 730)
      );

      let height, diameter;
      if (status === "mature") {
        height = (Math.random() * 25 + 15).toFixed(1);
        diameter = (Math.random() * 18 + 8).toFixed(1);
      } else if (status === "growing") {
        height = (Math.random() * 12 + 4).toFixed(1);
        diameter = (Math.random() * 8 + 2).toFixed(1);
      } else {
        height = (Math.random() * 4 + 1).toFixed(1);
        diameter = (Math.random() * 2 + 0.5).toFixed(1);
      }

      const locationDescriptions = [
        `${district.name} District, near village center`,
        `${district.name} District, school premises`,
        `${district.name} District, community park`,
        `${district.name} District, roadside plantation`,
        `${district.name} District, temple grounds`,
        `${district.name} District, agricultural field border`,
        `${district.name} District, government building compound`,
        `${district.name} District, residential area`,
      ];

      const location =
        locationDescriptions[
          Math.floor(Math.random() * locationDescriptions.length)
        ];

      trees.push({
        treeType: treeType.type,
        species: treeType.species,
        latitude: (district.lat + latOffset).toFixed(6),
        longitude: (district.lng + lngOffset).toFixed(6),
        location: location,
        district: district.name,
        state: "Tamil Nadu",
        status: status,
        healthStatus: healthStatus,
        plantedBy: plantedBy,
        plantedByType: plantedByType,
        plantedByRef: plantedByRef,
        centerId: centerId,
        plantedDate: plantedDate,
        lastInspection:
          status !== "planted"
            ? new Date(
                Date.now() -
                  Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
              )
            : null,
        height: parseFloat(height),
        diameter: parseFloat(diameter),
        notes: `${treeType.type} tree planted as part of environmental initiative. Current status: ${status}. Health condition: ${healthStatus}.`,
      });
    }

    const batchSize = 25;
    for (let i = 0; i < trees.length; i += batchSize) {
      const batch = trees.slice(i, i + batchSize);
      await db.insert(treesTable).values(batch);
      console.log(
        `✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          trees.length / batchSize
        )} (${batch.length} trees)`
      );
    }

    console.log(
      `\n🎉 Successfully created ${trees.length} trees across Tamil Nadu!`
    );

    const statusCounts = {};
    const districtCounts = {};
    const typeCounts = {};

    trees.forEach((tree) => {
      statusCounts[tree.status] = (statusCounts[tree.status] || 0) + 1;
      districtCounts[tree.district] = (districtCounts[tree.district] || 0) + 1;
      typeCounts[tree.treeType] = (typeCounts[tree.treeType] || 0) + 1;
    });

    console.log("\n📊 Tree Statistics:");
    console.log("===================");
    console.log("\n🌳 By Status:");
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`• ${status}: ${count} trees`);
    });

    console.log("\n📍 Top Districts:");
    Object.entries(districtCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .forEach(([district, count]) => {
        console.log(`• ${district}: ${count} trees`);
      });

    console.log("\n🌲 Top Tree Types:");
    Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .forEach(([type, count]) => {
        console.log(`• ${type}: ${count} trees`);
      });

    console.log("\n💡 API Endpoints:");
    console.log("• GET /api/trees - List all trees");
    console.log("• GET /api/trees/map/data - Get tree data for map");
    console.log("• GET /api/trees/stats/summary - Get tree statistics");
    console.log("• PATCH /api/trees/:id/status - Update tree status");
    console.log("• POST /api/trees - Create new tree");
  } catch (error) {
    console.error("❌ Error seeding trees:", error);
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedTrees()
    .then(() => {
      console.log("🏁 Tree seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Fatal error:", error);
      process.exit(1);
    });
}

export default seedTrees;
