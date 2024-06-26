import Router from 'express';
// import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';
import PromoMenuController from '../controllers/promoMenuController';
import compressImageMiddleware from '../middleware/compressImageMiddleware';

const router = Router();
// PROMO
router.get('/promo', PromoMenuController.getAllPromos);
router.post('/promo', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), PromoMenuController.addMenuItemToPromo);
router.delete('/promo', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), PromoMenuController.deleteMenuItemFromPromo);
// Main menu items
router.get('/', MenuController.getMenuItems);
router.get('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.getMenuItemByID);
router.post('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), compressImageMiddleware, MenuController.createMenuItem);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), compressImageMiddleware, MenuController.updateMenuItem);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.deleteMenuItem);

export default router;
