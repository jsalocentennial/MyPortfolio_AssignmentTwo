import express from "express";
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contact-controllers.js";
import authMiddleware from "../middlewares/auth.js";
import requireAdmin from "../middlewares/require_admin.js";

const router = express.Router();

//Read
router.get("/", authMiddleware, requireAdmin, getAllContacts);
router.get("/:id", authMiddleware, requireAdmin, getContactById);

//Create
router.post("/", createContact);

//Update
router.put("/:id", authMiddleware, requireAdmin, updateContact);
    
//Delete
router.delete("/:id", authMiddleware, requireAdmin, deleteContact);

export default router;