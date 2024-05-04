import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import SettingsController from '../controllers/settingsController';
import { UserRole } from '../../types';

const router = Router();

router.get('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), SettingsController.getAllSettings);
router.post('/update', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), SettingsController.bulkUpdateSettings);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), SettingsController.updateSettings);
export default router;
