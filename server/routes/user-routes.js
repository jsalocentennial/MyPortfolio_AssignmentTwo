import express from 'express';

import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/user-controllers.js';

const router = express.Router();

//Read
router.get('/', getAllUsers);
router.get('/:id', getUserById);

//Create
router.post('/', createUser);

//Update
router.put('/:id', updateUser);

//Delete
router.delete('/:id', deleteUser);

//Login
router.post('/login', loginUser);

export default router;