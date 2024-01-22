import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.get('/', AuthController.getAllUsers);
router.post('/', AuthController.createUser);
router.delete('/:id', AuthController.deleteUserById);

export default router;
