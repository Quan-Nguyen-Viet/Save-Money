import express from 'express';
import { getSaving, createSaving, getallSavingbyUserID, getSavingBySavingID, withdrawSaving } from '../controllers/saving.js'
const router = express.Router();

router.get('/', getSaving);

router.post('/', createSaving);

router.post('/getallsavingbyuserid', getallSavingbyUserID);

router.post('/getallsavingbysavingid', getSavingBySavingID);

router.post('/widthdrawsaving', withdrawSaving);

export default router;