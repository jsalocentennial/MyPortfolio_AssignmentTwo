import express from "express";
import { getAllQualifications, getQualificationById, createQualification, updateQualification, deleteQualification } from "../controllers/qualification-controllers.js";

const router = express.Router();

//Read
router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);

//Create
router.post("/", createQualification);

//Update
router.put("/:id", updateQualification);

//Delete
router.delete("/:id", deleteQualification);

export default router;