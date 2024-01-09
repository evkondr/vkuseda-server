import Router, { Request, Response } from 'express';
import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import imageUpload from '../middleware/imageUpload';

const router = Router();

router.get('/', secureRote, MenuController.getMenuItems);
router.get('/:id', MenuController.getMenuItemByID);
router.post('/', MenuController.createMenuItem);
router.patch('/:id', MenuController.updateMenuItem);
router.delete('/"id', MenuController.deleteMenuItem);
router.post('/upload', imageUpload.single('menu-image'), (req:Request, res:Response) => {
  const { file } = req;
  res.send(file);
});

export default router;
