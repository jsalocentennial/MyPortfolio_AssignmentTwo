import express from "express";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/project-controllers.js";
import authMiddleware from "../middlewares/auth.js";
import requireAdmin from "../middlewares/require_admin.js";

const router = express.Router();

//Read
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

//Create
router.post("/", authMiddleware, requireAdmin, createProject);    //Added Middleware to individual routes

//Update
router.put("/:id", authMiddleware, requireAdmin, updateProject);

//Delete
router.delete("/:id", authMiddleware, requireAdmin, deleteProject);

export default router;