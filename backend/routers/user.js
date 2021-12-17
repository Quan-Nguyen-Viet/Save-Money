import express from 'express';
import { register, login, logout, refreshToken, getUser, deleteUser, getAllUser, deposit } from '../controllers/user.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.delete('/delete/:id', deleteUser);

router.get('/allUsers', getAllUser);

router.post('/users/:id', getUser);

router.post('/deposit', deposit)

export default router;