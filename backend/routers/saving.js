import express from 'express';
import { getSaving, createSaving, getallSavingbyUserID, getSavingBySavingID, withdrawSaving } from '../controllers/saving.js'
import { verifyToken } from '../middlewares/saving.js';
const router = express.Router();

router.get('/', getSaving);

router.post('/',verifyToken, createSaving);

router.post('/getallsavingbyuserid', getallSavingbyUserID);

router.post('/getallsavingbysavingid', getSavingBySavingID);

router.post('/widthdrawsaving', verifyToken, withdrawSaving);

export default router;