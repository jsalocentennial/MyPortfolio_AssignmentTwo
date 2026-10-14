import express from 'express';
import authMiddleware from '../middlewares/auth.js';

import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/user-controllers.js';

const router = express.Router();

//Read
router.get('/', authMiddleware, getAllUsers);      
router.get('/:id', authMiddleware, getUserById);

//Create
router.post('/', createUser);         //Middleware not required

//Update
router.put('/:id', authMiddleware, updateUser);

//Delete
router.delete('/:id', authMiddleware, deleteUser);

//Login
router.post('/login', loginUser);       //Middleware not required

export default router;