import express from "express";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import {
  centersTable,
  communityEducatorsTable,
  studentsTable,
} from "../db/schema.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { name, address, phone, email, capacity } = req.body;
    try {
      const newCenter = await db
        .insert(centersTable)
        .values({
          name,
          address,
          phone,
          email,
          capacity,
          programManagerId: req.user.entityId,
        })
        .returning()
        .execute();

      res.json({
        message: "Center created successfully",
        center: newCenter[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating center", error });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let centers;
    centers = await db.select().from(centersTable);

    res.json({ centers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching centers", error });
  }
});

router.get(
  "/:centerId",
  verifyToken,
  requireRole(["program_manager", "educator"]),
  async (req, res) => {
    const { centerId } = req.params;

    try {
      let center;

      if (req.user.role === "program_manager") {
        center = await db
          .select()
          .from(centersTable)
          .where(eq(centersTable.id, parseInt(centerId)))
          .limit(1);

        if (
          center.length === 0 ||
          center[0].programManagerId !== req.user.entityId
        ) {
          return res
            .status(403)
            .json({ message: "Access denied to this center" });
        }
      } else {
        const educator = await db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.id, req.user.entityId))
          .limit(1);

        if (educator[0].centerId !== parseInt(centerId)) {
          return res
            .status(403)
            .json({ message: "Access denied to this center" });
        }

        center = await db
          .select()
          .from(centersTable)
          .where(eq(centersTable.id, parseInt(centerId)))
          .limit(1);
      }

      if (center.length === 0) {
        return res.status(404).json({ message: "Center not found" });
      }

      const [educators, students] = await Promise.all([
        db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.centerId, parseInt(centerId))),
        db
          .select()
          .from(studentsTable)
          .where(eq(studentsTable.centerId, parseInt(centerId))),
      ]);

      res.json({
        center: {
          ...center[0],
          educatorCount: educators.length,
          studentCount: students.length,
          activeStudentCount: students.filter((s) => s.isActive === 1).length,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching center", error });
    }
  }
);

router.put(
  "/:centerId",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { centerId } = req.params;
    const { name, address, phone, email, capacity } = req.body;

    try {
      const center = await db
        .select()
        .from(centersTable)
        .where(eq(centersTable.id, parseInt(centerId)))
        .limit(1);

      if (
        center.length === 0 ||
        center[0].programManagerId !== req.user.entityId
      ) {
        return res
          .status(403)
          .json({ message: "Access denied to this center" });
      }

      const updatedCenter = await db
        .update(centersTable)
        .set({
          name,
          address,
          phone,
          email,
          capacity,
          updatedAt: new Date(),
        })
        .where(eq(centersTable.id, parseInt(centerId)))
        .returning()
        .execute();

      res.json({
        message: "Center updated successfully",
        center: updatedCenter[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating center", error });
    }
  }
);

router.delete(
  "/:centerId",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { centerId } = req.params;

    try {
      const center = await db
        .select()
        .from(centersTable)
        .where(eq(centersTable.id, parseInt(centerId)))
        .limit(1);

      if (
        center.length === 0 ||
        center[0].programManagerId !== req.user.entityId
      ) {
        return res
          .status(403)
          .json({ message: "Access denied to this center" });
      }

      const [educators, students] = await Promise.all([
        db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.centerId, parseInt(centerId))),
        db
          .select()
          .from(studentsTable)
          .where(eq(studentsTable.centerId, parseInt(centerId))),
      ]);

      if (educators.length > 0 || students.length > 0) {
        return res.status(400).json({
          message: "Cannot delete center with existing educators or students",
          educatorCount: educators.length,
          studentCount: students.length,
        });
      }

      await db
        .delete(centersTable)
        .where(eq(centersTable.id, parseInt(centerId)))
        .execute();

      res.json({ message: "Center deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting center", error });
    }
  }
);

router.get(
  "/:centerId/stats",
  verifyToken,
  requireRole(["program_manager", "educator"]),
  async (req, res) => {
    const { centerId } = req.params;

    try {
      if (req.user.role === "educator") {
        const educator = await db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.id, req.user.entityId))
          .limit(1);

        if (educator[0].centerId !== parseInt(centerId)) {
          return res
            .status(403)
            .json({ message: "Access denied to this center" });
        }
      } else {
        const center = await db
          .select()
          .from(centersTable)
          .where(eq(centersTable.id, parseInt(centerId)))
          .limit(1);

        if (
          center.length === 0 ||
          center[0].programManagerId !== req.user.entityId
        ) {
          return res
            .status(403)
            .json({ message: "Access denied to this center" });
        }
      }

      const [educators, allStudents] = await Promise.all([
        db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.centerId, parseInt(centerId))),
        db
          .select()
          .from(studentsTable)
          .where(eq(studentsTable.centerId, parseInt(centerId))),
      ]);

      const activeStudents = allStudents.filter((s) => s.isActive === 1);
      const gradeDistribution = activeStudents.reduce((acc, student) => {
        acc[student.grade] = (acc[student.grade] || 0) + 1;
        return acc;
      }, {});

      res.json({
        centerStats: {
          totalEducators: educators.length,
          totalStudents: allStudents.length,
          activeStudents: activeStudents.length,
          inactiveStudents: allStudents.length - activeStudents.length,
          gradeDistribution,
          averageAge:
            activeStudents.length > 0
              ? Math.round(
                  activeStudents.reduce((sum, s) => sum + s.age, 0) /
                    activeStudents.length
                )
              : 0,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching center statistics", error });
    }
  }
);

export default router;
