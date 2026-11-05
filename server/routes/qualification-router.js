import express from "express";
import { getAllQualifications, getQualificationById, createQualification, updateQualification, deleteQualification } from "../controllers/qualification-controllers.js";
import authMiddleware from "../middlewares/auth.js";
import requireAdmin from "../middlewares/require_admin.js";


const router = express.Router();

//Read
router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);

//Create
router.post("/", authMiddleware, requireAdmin, createQualification);

//Update
router.put("/:id", authMiddleware, requireAdmin, updateQualification);     //Added Middleware to individual routes

//Delete
router.delete("/:id", authMiddleware, requireAdmin, deleteQualification);

export default router;