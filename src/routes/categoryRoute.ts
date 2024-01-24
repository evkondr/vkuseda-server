import { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import authMiddleware from '../middleware/authMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', authMiddleware([UserRole.ADMIN, UserRole.EDITOR]), CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryByID);
router.post('/', CategoryController.createCategory);
router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
