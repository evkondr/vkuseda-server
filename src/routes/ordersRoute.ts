import { Router } from 'express';
import orderController from '../controllers/orderController';

const router = Router();

router.get('/', orderController.getAllOrders);
router.post('/send-order', orderController.sendOrderByEmail);
router.post('/:id', orderController.updateOrderStatus);

export default router;
