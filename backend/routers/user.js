import express from 'express';
import { register, login, logout, refreshToken, getUser, deleteUser, getAllUser } from '../controllers/user.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.delete('/delete/:id', deleteUser);

router.get('/allUsers', getAllUser);

router.post('/users/:id', getUser);

export default router;