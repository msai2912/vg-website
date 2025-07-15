import express from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { communityEducatorsTable, centersTable } from "../db/schema.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/register",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      centerId,
      qualifications,
      specialization,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newEducator = await db
        .insert(communityEducatorsTable)
        .values({
          name,
          email,
          password: hashedPassword,
          phone,
          centerId,
          qualifications,
          specialization,
        })
        .returning()
        .execute();

      const { password: _, ...userData } = newEducator[0];
      res.json({
        message: "Educator registration successful",
        educator: userData,
      });
    } catch (error) {
      res.status(500).json({ message: "Error registering educator", error });
    }
  }
);

router.get(
  "/",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    try {
      const educators = await db
        .select({
          id: communityEducatorsTable.id,
          name: communityEducatorsTable.name,
          email: communityEducatorsTable.email,
          phone: communityEducatorsTable.phone,
          qualifications: communityEducatorsTable.qualifications,
          specialization: communityEducatorsTable.specialization,
          centerId: communityEducatorsTable.centerId,
          centerName: centersTable.name,
          createdAt: communityEducatorsTable.createdAt,
        })
        .from(communityEducatorsTable)
        .innerJoin(
          centersTable,
          eq(communityEducatorsTable.centerId, centersTable.id)
        )
        .where(eq(centersTable.programManagerId, req.user.entityId));

      res.json({ educators });
    } catch (error) {
      res.status(500).json({ message: "Error fetching educators", error });
    }
  }
);

router.get(
  "/:educatorId",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { educatorId } = req.params;

    try {
      const educator = await db
        .select({
          id: communityEducatorsTable.id,
          name: communityEducatorsTable.name,
          email: communityEducatorsTable.email,
          phone: communityEducatorsTable.phone,
          qualifications: communityEducatorsTable.qualifications,
          specialization: communityEducatorsTable.specialization,
          centerId: communityEducatorsTable.centerId,
          centerName: centersTable.name,
          createdAt: communityEducatorsTable.createdAt,
          updatedAt: communityEducatorsTable.updatedAt,
        })
        .from(communityEducatorsTable)
        .innerJoin(
          centersTable,
          eq(communityEducatorsTable.centerId, centersTable.id)
        )
        .where(eq(communityEducatorsTable.id, parseInt(educatorId)))
        .limit(1);

      if (educator.length === 0) {
        return res.status(404).json({ message: "Educator not found" });
      }

      res.json({ educator: educator[0] });
    } catch (error) {
      res.status(500).json({ message: "Error fetching educator", error });
    }
  }
);

router.put(
  "/:educatorId",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { educatorId } = req.params;
    const { name, email, phone, centerId, qualifications, specialization } =
      req.body;

    try {
      const updatedEducator = await db
        .update(communityEducatorsTable)
        .set({
          name,
          email,
          phone,
          centerId,
          qualifications,
          specialization,
          updatedAt: new Date(),
        })
        .where(eq(communityEducatorsTable.id, parseInt(educatorId)))
        .returning()
        .execute();

      if (updatedEducator.length === 0) {
        return res.status(404).json({ message: "Educator not found" });
      }

      const { password: _, ...educatorData } = updatedEducator[0];
      res.json({
        message: "Educator updated successfully",
        educator: educatorData,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating educator", error });
    }
  }
);

router.put(
  "/:educatorId/password",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { educatorId } = req.params;
    const { newPassword } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedEducator = await db
        .update(communityEducatorsTable)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(communityEducatorsTable.id, parseInt(educatorId)))
        .returning({ id: communityEducatorsTable.id })
        .execute();

      if (updatedEducator.length === 0) {
        return res.status(404).json({ message: "Educator not found" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating password", error });
    }
  }
);

router.delete(
  "/:educatorId",
  verifyToken,
  requireRole(["program_manager"]),
  async (req, res) => {
    const { educatorId } = req.params;

    try {
      const deletedEducator = await db
        .delete(communityEducatorsTable)
        .where(eq(communityEducatorsTable.id, parseInt(educatorId)))
        .returning({ id: communityEducatorsTable.id })
        .execute();

      if (deletedEducator.length === 0) {
        return res.status(404).json({ message: "Educator not found" });
      }

      res.json({ message: "Educator removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error removing educator", error });
    }
  }
);

router.get(
  "/center/:centerId",
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

      const educators = await db
        .select({
          id: communityEducatorsTable.id,
          name: communityEducatorsTable.name,
          email: communityEducatorsTable.email,
          phone: communityEducatorsTable.phone,
          qualifications: communityEducatorsTable.qualifications,
          specialization: communityEducatorsTable.specialization,
        })
        .from(communityEducatorsTable)
        .where(eq(communityEducatorsTable.centerId, parseInt(centerId)));

      res.json({ educators });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching educators for center", error });
    }
  }
);

export default router;
