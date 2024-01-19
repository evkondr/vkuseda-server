import Router from 'express';
import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import imageUpload from '../middleware/imageUpload';

const router = Router();

router.get('/', secureRote, MenuController.getMenuItems);
router.get('/:id', MenuController.getMenuItemByID);
router.post('/', imageUpload, MenuController.createMenuItem);
router.patch('/:id', imageUpload, MenuController.updateMenuItem);
router.delete('/:id', MenuController.deleteMenuItem);

export default router;
