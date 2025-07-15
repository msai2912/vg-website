import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { studentsTable, communityEducatorsTable } from "../db/schema.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token verified for user:", req.user.id);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id || !req.user.role) {
        console.error("User not authenticated or role not set");
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("User authenticated:", req.user.id, "Role:", req.user.role);
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      if (
        req.user.role === "educator" &&
        (req.params.studentId || req.body.studentId)
      ) {
        const studentId = req.params.studentId || req.body.studentId;
        const student = await db
          .select()
          .from(studentsTable)
          .where(eq(studentsTable.id, studentId))
          .limit(1);

        if (student.length === 0) {
          return res.status(404).json({ message: "Student not found" });
        }

        const educator = await db
          .select()
          .from(communityEducatorsTable)
          .where(eq(communityEducatorsTable.id, req.user.entityId))
          .limit(1);

        if (
          educator.length === 0 ||
          educator[0].centerId !== student[0].centerId
        ) {
          return res
            .status(403)
            .json({ message: "Cannot access students from other centers" });
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Error checking permissions" });
    }
  };
};
