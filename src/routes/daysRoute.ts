import { Router } from 'express';
import DaysControlle from '../controllers/dayController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', DaysControlle.getAllDays);
router.get('/:id', DaysControlle.getDayById);
router.post('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DaysControlle.createDay);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DaysControlle.deleteDay);

router.post('/menu-items', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DaysControlle.addMenuItem);
router.post('/delete-menu-item', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), DaysControlle.delMenuItem);

export default router;
