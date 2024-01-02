import Router from 'express';
import MenuController from '../controllers/menuController';

const router = Router();

router.get('menu/', MenuController.getMenuItems);
router.get('menu/:id', MenuController.getMenuItemByID);
router.post('menu/', MenuController.createMenuItem);
router.patch('menu/:id', MenuController.updateMenuItem);
router.delete('menu/"id', MenuController.deleteMenuItem);

export default router;
