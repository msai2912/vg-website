import { initTracing } from "./utils/tracing.js";
initTracing();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/students.js";
import educatorRoutes from "./routes/educators.js";
import centerRoutes from "./routes/centers.js";
import treeRoutes from "./routes/trees.js";
import { register, metricsMiddleware } from "./utils/metrics.js";
import { logger, requestLogger } from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
// Disable CORS in Express since nginx handles it
// app.use(
//   cors({
//     origin: true, // Allow all origins
//     credentials: true,
//   })
// );

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.head("/api/health", (req, res) => {
  res.status(200).end();
});

app.use(requestLogger);
app.use(metricsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    logger.error("Error generating metrics", { error: error.message });
    res.status(500).end();
  }
});

app.use("/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/educators", educatorRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/trees", treeRoutes);

app.get("/", (req, res) => {
  logger.info("Root endpoint accessed");
  res.send("Hello World!");
});

app.listen(port, () => {
  logger.info(`Server started`, {
    port: port,
    environment: process.env.NODE_ENV || "development",
  });
  console.log(`Example app listening at http://localhost:${port}`);
});
