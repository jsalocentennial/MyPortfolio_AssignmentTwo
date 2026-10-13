import express from "express";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/project-controllers.js";

const router = express.Router();

//Read
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

//Create
router.post("/", createProject);

//Update
router.put("/:id", updateProject);

//Delete
router.delete("/:id", deleteProject);

export default router;