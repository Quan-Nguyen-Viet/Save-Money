import express from 'express';
import { getHistory, createHistory, getHistoryById } from '../controllers/history.js';
import { auth } from '../middlewares/auth.js';
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

router.get('/allhistory', auth, authAdmin, getHistory);
router.get('/allhistorys',  getHistory);
router.post('/createhistory', createHistory);
router.get('/userhistory', auth, getHistoryById);

export default router;
