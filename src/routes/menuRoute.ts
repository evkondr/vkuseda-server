import Router from 'express';
import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';

const router = Router();

router.get('/', secureRote, MenuController.getMenuItems);
router.get('/:id', MenuController.getMenuItemByID);
router.post('/', MenuController.createMenuItem);
router.patch('/:id', MenuController.updateMenuItem);
router.delete('/"id', MenuController.deleteMenuItem);

export default router;
