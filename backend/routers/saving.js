import express from 'express';
import { getSaving, createSaving, cycleCheckSaving, getallSavingbyUserID, withdrawSaving } from '../controllers/saving.js'
const router = express.Router();

router.get('/', getSaving);

router.post('/', createSaving);

router.post('/updateSaving', cycleCheckSaving);

router.post('/getallsavingbyuserid', getallSavingbyUserID);

router.post('/widthdrawsaving', withdrawSaving);

export default router;