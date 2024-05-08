import { Router } from 'express';
import orderController from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), orderController.getAllOrders);
router.post('/send-order', orderController.sendOrderByEmail);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), orderController.updateOrderStatus);

export default router;
