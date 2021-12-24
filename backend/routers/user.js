import express from 'express';
import { register, login, logout, refreshToken, getUser, deleteUser, getAllUser, updateUser, deposit, withdraw } from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { verifyToken, depositValidate, withdrawValidate } from '../middlewares/user.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.delete('/deleteuser/:id', auth, authAdmin, deleteUser);

router.get('/allusers', auth, authAdmin,getAllUser);
router.get('/alluserstest', getAllUser);

router.get('/getusers/:id', getUser);

router.post('/deposit', verifyToken, depositValidate, deposit); //nạp tiền

router.post('/withdraw', verifyToken, withdrawValidate, withdraw); //rút tiền

router.put('/updateuser/:id',  updateUser);

export default router;