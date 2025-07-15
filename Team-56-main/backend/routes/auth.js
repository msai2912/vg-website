import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import {
  usersTable,
  programManagersTable,
  communityEducatorsTable,
  studentsTable,
} from "../db/schema.js";
import { createToken } from "../utils/jwt_handler.js";
import { verifyToken } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

router.post("/register/program-manager", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newManager = await db
      .insert(programManagersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        phone,
      })
      .returning()
      .execute();

    const token = createToken({
      id: newManager[0].id,
      role: "program_manager",
      entityId: newManager[0].id,
    });
    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userData } = newManager[0];
    res.json({
      message: "Program Manager registration successful",
      user: { ...userData, role: "program_manager" },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering program manager", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role, contact } = req.body;

  try {
    let user = null;
    let entityId = null;

    if (role === "program_manager") {
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required for program managers",
        });
      }
      const result = await db
        .select()
        .from(programManagersTable)
        .where(eq(programManagersTable.email, email))
        .limit(1);
      user = result[0];
      entityId = user?.id;
    } else if (role === "educator") {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required for educators" });
      }
      const result = await db
        .select()
        .from(communityEducatorsTable)
        .where(eq(communityEducatorsTable.email, email))
        .limit(1);
      user = result[0];
      entityId = user?.id;
    } else if (role === "student") {
      const loginContact = contact || email;
      if (!loginContact) {
        return res
          .status(400)
          .json({ message: "Contact number is required for students" });
      }
      const result = await db
        .select()
        .from(studentsTable)
        .where(eq(studentsTable.contact, loginContact))
        .limit(1);
      user = result[0];
      entityId = user?.id;
    }

    if (!user) {
      return res.status(401).json({
        message:
          role === "student"
            ? "Invalid contact number"
            : "Invalid email or password",
      });
    }

    if (role !== "student") {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }

    const token = createToken({
      id: user.id,
      role: role,
      entityId: entityId,
      centerId: user.centerId || null,
    });
    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userData } = user;
    res.json({
      message: "Login successful",
      user: {
        ...userData,
        role: role,
        centerId: user.centerId || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        age,
      })
      .returning()
      .execute();
    const token = createToken({ id: newUser[0].id });
    res.cookie("token", token, { httpOnly: true });
    const { password: _, ...userData } = newUser[0];
    res.json({
      message: "Registration successful",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = createToken({ id: req.user.id });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    let user = null;
    let tableName = "";

    if (req.user.role === "program_manager") {
      const result = await db
        .select()
        .from(programManagersTable)
        .where(eq(programManagersTable.id, req.user.entityId))
        .limit(1);
      user = result[0];
      tableName = "program_manager";
    } else if (req.user.role === "educator") {
      const result = await db
        .select()
        .from(communityEducatorsTable)
        .where(eq(communityEducatorsTable.id, req.user.entityId))
        .limit(1);
      user = result[0];
      tableName = "educator";
    } else if (req.user.role === "student") {
      const result = await db
        .select()
        .from(studentsTable)
        .where(eq(studentsTable.id, req.user.entityId))
        .limit(1);
      user = result[0];
      tableName = "student";
    } else {
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, req.user.id))
        .limit(1);
      user = result[0];
      tableName = "user";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;
    res.json({
      user: {
        ...userData,
        role: req.user.role || tableName,
        userType: tableName,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

router.get("/verify", verifyToken, (req, res) => {
  res.json({
    valid: true,
    user: {
      id: req.user.id,
      role: req.user.role,
      entityId: req.user.entityId,
    },
  });
});

export default router;
