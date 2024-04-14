import { Router } from 'express';
import DailyMenuController from '../controllers/dailyMenuController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', DailyMenuController.getAllDays);
router.get('/:id', DailyMenuController.getDayById);
router.post('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DailyMenuController.createDay);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DailyMenuController.deleteDay);

router.post('/add-menu-items', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DailyMenuController.addMenuItem);
router.post('/delete-menu-item', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DailyMenuController.delMenuItem);

export default router;
