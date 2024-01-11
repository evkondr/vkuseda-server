import Router, { NextFunction, Request, Response } from 'express';
import secureRote from '../middleware/secureRoute';
import MenuController from '../controllers/menuController';
import imageUpload from '../middleware/imageUpload';

const router = Router();

router.get('/', secureRote, MenuController.getMenuItems);
router.get('/:id', MenuController.getMenuItemByID);
router.post('/', MenuController.createMenuItem);
router.patch('/:id', MenuController.updateMenuItem);
router.delete('/"id', MenuController.deleteMenuItem);
router.post('/upload', imageUpload, (req:Request, res:Response, next:NextFunction) => {
  try {
    const { file } = req;
    res.send(file);
  } catch (error) {
    next(error);
  }
});

export default router;
