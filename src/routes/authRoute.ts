import { Router } from 'express';
import AuthController from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/users', authMiddleware([UserRole.ADMIN, UserRole.EDITOR, UserRole.USER]), AuthController.getAllUsers);
router.get('/check', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), AuthController.checkAuth);
router.post('/register', AuthController.createUser);
router.post('/login', AuthController.logIn);
router.delete('/users/:id', authMiddleware([UserRole.ADMIN]), AuthController.deleteUserById);

export default router;
