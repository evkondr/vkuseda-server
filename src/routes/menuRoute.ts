import Router from 'express';
import MenuController from '../controllers/menuController';

const router = Router();

router.get('/', MenuController.getMenuItems);
router.get('/:id', MenuController.getMenuItemByID);
router.post('/', MenuController.createMenuItem);
router.patch('/:id', MenuController.updateMenuItem);
router.delete('/"id', MenuController.deleteMenuItem);

export default router;
