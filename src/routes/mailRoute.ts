import { Router } from 'express';
import MailControeller from '../controllers/mailController';

const router = Router();

router.post('/send-email', MailControeller.sendEmail);

export default router;
