import { Router } from 'express';
import mailController from '../controllers/mailController';

const router = Router();

router.post('/send-order', mailController.sendOrderByEmail);

export default router;
