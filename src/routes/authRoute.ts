import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.get('/', AuthController.getAllUsers);
router.post('/', AuthController.createUser);

export default router;
