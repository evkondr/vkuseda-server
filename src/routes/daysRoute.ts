import { Router } from 'express';
import DaysControlle from '../controllers/dayController';
// import authMiddleware from '../middleware/authMiddleware';
// import { UserRole } from '../../types';

const router = Router();

router.get('/', DaysControlle.getAllDays);
router.get('/:id', DaysControlle.getDayById);
router.post('/', DaysControlle.createDay);
router.delete('/:id', DaysControlle.deleteDay);

router.post('/menu-items', DaysControlle.addMenuItem);

export default router;
