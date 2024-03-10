import { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), CategoryController.getCategoryByID);
router.post('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), CategoryController.createCategory);
router.patch('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), CategoryController.updateCategory);
router.delete('/:id', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), CategoryController.deleteCategory);

export default router;
