import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.get('/', AuthController.getAllUsers);
router.post('/register', AuthController.createUser);
router.post('/login', AuthController.logIn);
router.delete('/:id', AuthController.deleteUserById);

export default router;
