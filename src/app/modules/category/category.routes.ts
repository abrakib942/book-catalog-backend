import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getACategory);

router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id');

export const CategoryRoutes = router;
