import express from "express";
import db from "../db/index.js";
import {
  treesTable,
  centersTable,
  studentsTable,
  communityEducatorsTable,
} from "../db/schema.js";
import { eq, and, desc, asc } from "drizzle-orm";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      status,
      district,
      plantedByType,
      centerId,
      limit = 100,
    } = req.query;

    let query = db.select().from(treesTable);

    const conditions = [];
    if (status) conditions.push(eq(treesTable.status, status));
    if (district) conditions.push(eq(treesTable.district, district));
    if (plantedByType)
      conditions.push(eq(treesTable.plantedByType, plantedByType));
    if (centerId) conditions.push(eq(treesTable.centerId, parseInt(centerId)));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const trees = await query
      .orderBy(desc(treesTable.plantedDate))
      .limit(parseInt(limit));

    logger.info(`Retrieved ${trees.length} trees`, {
      filters: { status, district, plantedByType, centerId },
    });

    res.json(trees);
  } catch (error) {
    logger.error("Error fetching trees", { error: error.message });
    res.status(500).json({ error: "Failed to fetch trees" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tree = await db
      .select()
      .from(treesTable)
      .where(eq(treesTable.id, parseInt(id)))
      .limit(1);

    if (tree.length === 0) {
      return res.status(404).json({ error: "Tree not found" });
    }

    res.json(tree[0]);
  } catch (error) {
    logger.error("Error fetching tree", {
      error: error.message,
      treeId: req.params.id,
    });
    res.status(500).json({ error: "Failed to fetch tree" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      treeType,
      species,
      latitude,
      longitude,
      location,
      district,
      state = "Tamil Nadu",
      plantedBy,
      plantedByType,
      plantedByRef,
      centerId,
      plantedDate,
      height,
      diameter,
      notes,
      imageUrl,
    } = req.body;

    if (
      !treeType ||
      !latitude ||
      !longitude ||
      !location ||
      !district ||
      !plantedBy ||
      !plantedByType ||
      !plantedDate
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: treeType, latitude, longitude, location, district, plantedBy, plantedByType, plantedDate",
      });
    }

    const newTree = await db
      .insert(treesTable)
      .values({
        treeType,
        species,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        location,
        district,
        state,
        plantedBy,
        plantedByType,
        plantedByRef: plantedByRef ? parseInt(plantedByRef) : null,
        centerId: centerId ? parseInt(centerId) : null,
        plantedDate: new Date(plantedDate),
        height: height ? parseFloat(height) : null,
        diameter: diameter ? parseFloat(diameter) : null,
        notes,
        imageUrl,
      })
      .returning();

    logger.info("New tree created", {
      treeId: newTree[0].id,
      treeType,
      location,
    });
    res.status(201).json(newTree[0]);
  } catch (error) {
    logger.error("Error creating tree", { error: error.message });
    res.status(500).json({ error: "Failed to create tree" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    delete updateData.id;
    delete updateData.createdAt;

    if (updateData.latitude)
      updateData.latitude = parseFloat(updateData.latitude);
    if (updateData.longitude)
      updateData.longitude = parseFloat(updateData.longitude);
    if (updateData.height) updateData.height = parseFloat(updateData.height);
    if (updateData.diameter)
      updateData.diameter = parseFloat(updateData.diameter);
    if (updateData.plantedByRef)
      updateData.plantedByRef = parseInt(updateData.plantedByRef);
    if (updateData.centerId)
      updateData.centerId = parseInt(updateData.centerId);

    updateData.updatedAt = new Date();

    const updatedTree = await db
      .update(treesTable)
      .set(updateData)
      .where(eq(treesTable.id, parseInt(id)))
      .returning();

    if (updatedTree.length === 0) {
      return res.status(404).json({ error: "Tree not found" });
    }

    logger.info("Tree updated", {
      treeId: id,
      updates: Object.keys(updateData),
    });
    res.json(updatedTree[0]);
  } catch (error) {
    logger.error("Error updating tree", {
      error: error.message,
      treeId: req.params.id,
    });
    res.status(500).json({ error: "Failed to update tree" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, healthStatus, notes, lastInspection } = req.body;

    const updateData = {
      updatedAt: new Date(),
    };

    if (status) updateData.status = status;
    if (healthStatus) updateData.healthStatus = healthStatus;
    if (notes) updateData.notes = notes;
    if (lastInspection) updateData.lastInspection = new Date(lastInspection);

    const updatedTree = await db
      .update(treesTable)
      .set(updateData)
      .where(eq(treesTable.id, parseInt(id)))
      .returning();

    if (updatedTree.length === 0) {
      return res.status(404).json({ error: "Tree not found" });
    }

    logger.info("Tree status updated", { treeId: id, status, healthStatus });
    res.json(updatedTree[0]);
  } catch (error) {
    logger.error("Error updating tree status", {
      error: error.message,
      treeId: req.params.id,
    });
    res.status(500).json({ error: "Failed to update tree status" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTree = await db
      .delete(treesTable)
      .where(eq(treesTable.id, parseInt(id)))
      .returning();

    if (deletedTree.length === 0) {
      return res.status(404).json({ error: "Tree not found" });
    }

    logger.info("Tree deleted", { treeId: id });
    res.json({ message: "Tree deleted successfully", tree: deletedTree[0] });
  } catch (error) {
    logger.error("Error deleting tree", {
      error: error.message,
      treeId: req.params.id,
    });
    res.status(500).json({ error: "Failed to delete tree" });
  }
});

router.get("/stats/summary", async (req, res) => {
  try {
    const trees = await db.select().from(treesTable);

    const stats = {
      total: trees.length,
      byStatus: {},
      byDistrict: {},
      byType: {},
      byPlantedBy: {},
      recentlyPlanted: trees.filter((tree) => {
        const plantedDate = new Date(tree.plantedDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return plantedDate > thirtyDaysAgo;
      }).length,
    };

    trees.forEach((tree) => {
      stats.byStatus[tree.status] = (stats.byStatus[tree.status] || 0) + 1;

      stats.byDistrict[tree.district] =
        (stats.byDistrict[tree.district] || 0) + 1;

      stats.byType[tree.treeType] = (stats.byType[tree.treeType] || 0) + 1;

      stats.byPlantedBy[tree.plantedByType] =
        (stats.byPlantedBy[tree.plantedByType] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    logger.error("Error fetching tree statistics", { error: error.message });
    res.status(500).json({ error: "Failed to fetch tree statistics" });
  }
});

router.get("/map/data", async (req, res) => {
  try {
    const { status, district } = req.query;

    let query = db
      .select({
        id: treesTable.id,
        latitude: treesTable.latitude,
        longitude: treesTable.longitude,
        treeType: treesTable.treeType,
        status: treesTable.status,
        healthStatus: treesTable.healthStatus,
        location: treesTable.location,
        plantedBy: treesTable.plantedBy,
        plantedDate: treesTable.plantedDate,
      })
      .from(treesTable);

    const conditions = [];
    if (status) conditions.push(eq(treesTable.status, status));
    if (district) conditions.push(eq(treesTable.district, district));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const trees = await query;

    res.json(trees);
  } catch (error) {
    logger.error("Error fetching tree map data", { error: error.message });
    res.status(500).json({ error: "Failed to fetch tree map data" });
  }
});

export default router;
