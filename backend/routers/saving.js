import express from 'express';
import { getSaving, createSaving, getallSavingbyUserID, getSavingBySavingID, withdrawSaving } from '../controllers/saving.js'
import { verifyToken, createSavingValidate } from '../middlewares/saving.js';
const router = express.Router();

router.get('/', getSaving); //lấy tất cả savings

router.post('/',verifyToken, createSavingValidate, createSaving); //tạo saving

router.post('/getallsavingbyuserid', getallSavingbyUserID); //lấy tất cả saving theo userid

router.post('/getallsavingbysavingid', getSavingBySavingID); //lấy thông tin saving theo savingid

router.post('/widthdrawsaving', verifyToken, withdrawSaving); //rút saving

export default router;