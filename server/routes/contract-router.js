import express from "express";
import { getAllContracts, getContractById, createContract, updateContract, deleteContract } from "../controllers/contract-controllers.js";

const router = express.Router();

//Read
router.get("/", getAllContracts);
router.get("/:id", getContractById);

//Create
router.post("/", createContract);

//Update
router.put("/:id", updateContract);

//Delete
router.delete("/:id", deleteContract);

export default router;