import express from 'express';
import { getHistory, createHistory } from '../controllers/history.js';

const router = express.Router();

router.get('/', getHistory);
router.post('/', createHistory);

export default router;
