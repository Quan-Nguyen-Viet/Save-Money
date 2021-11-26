import express from 'express';
import { getSaving, createSaving } from '../controllers/saving.js'
const router = express.Router();

router.get('/', getSaving);

router.post('/', createSaving);

export default router;