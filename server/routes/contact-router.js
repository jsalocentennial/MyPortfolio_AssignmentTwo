import express from "express";
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contact-controllers.js";

const router = express.Router();

//Read
router.get("/", getAllContacts);
router.get("/:id", getContactById);

//Create
router.post("/", createContact);

//Update
router.put("/:id", updateContact);

//Delete
router.delete("/:id", deleteContact);

export default router;