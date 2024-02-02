import { Router } from 'express';
import orderController from '../controllers/orderController';

const router = Router();

router.post('/send-order', orderController.sendOrderByEmail);

export default router;
