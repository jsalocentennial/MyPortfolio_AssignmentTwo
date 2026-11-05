import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import requireAdmin from '../middlewares/require_admin.js';
import requireOwnerOrAdmin from '../middlewares/require_owner_or_admin.js';

import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, logoutUser } from '../controllers/user-controllers.js';

const router = express.Router();

//Read
router.get('/', authMiddleware, requireAdmin, getAllUsers);      
router.get('/:id', authMiddleware, requireOwnerOrAdmin, getUserById);

//Create
router.post('/', createUser);         //Middleware not required

//Update
router.put('/:id', authMiddleware, requireOwnerOrAdmin, updateUser);

//Delete
router.delete('/:id', authMiddleware, requireOwnerOrAdmin, deleteUser);

//Login
router.post('/login', loginUser);       //Middleware not required

//Logout
router.post('/logout', authMiddleware, logoutUser);

export default router;