import { Router } from 'express';
import MailControeller from '../controllers/mailController';
import secureRote from '../middleware/secureRoute';

const router = Router();

router.post('/send-email', secureRote, MailControeller.sendEmail);

export default router;
