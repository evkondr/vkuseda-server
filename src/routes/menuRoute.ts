import Router from 'express';
import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import imageUpload from '../middleware/imageUpload';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';
import MenuPromoController from '../controllers/menuPromoController';

const router = Router();

router.get('/promo', secureRote, MenuPromoController.getPromoItems);
router.get('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.getMenuItems);
router.get('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.getMenuItemByID);
router.post('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), imageUpload, MenuController.createMenuItem);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), imageUpload, MenuController.updateMenuItem);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.deleteMenuItem);

export default router;
