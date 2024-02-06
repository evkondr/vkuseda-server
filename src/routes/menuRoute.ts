import Router, { Request, Response } from 'express';
// import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import imageUpload from '../middleware/imageUpload';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';
import PromoMenuController from '../controllers/promoMenuController';
import compressImageMiddleware from '../middleware/compressImageMiddleware';

const router = Router();
router.post('/test', compressImageMiddleware, (req: Request, res: Response) => {
  res.json({
    image: req.file?.filename,
  });
});
// PROMO
router.get('/promo', PromoMenuController.getAllPromos);
router.post('/promo', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), PromoMenuController.addMenuItemToPromo);
router.delete('/promo/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), PromoMenuController.deleteMenuItemFromPromo);
// Main menu items
router.get('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.getMenuItems);
router.get('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.getMenuItemByID);
router.post('/', imageUpload, authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.createMenuItem);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), imageUpload, MenuController.updateMenuItem);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), MenuController.deleteMenuItem);

export default router;
