import { Router } from 'express';

import { signUp, signIn } from '../controllers/auth.controller';
import { createCategory, readCategories, readCategory, updateCategory, deleteCategory } from '../controllers/categories.controller';
import { createProduct, readProducts } from '../controllers/products.controller';

import { verifyToken } from '../middlewares/jsonwebtoken';
import multer from '../middlewares/multer';

const router = Router();

router.post('/sign-up', signUp);

router.get('/sign-in', signIn);

router.route('/products')
    .post(verifyToken, multer.single('image'), createProduct)
    .get(readProducts);

router.route('/categories')
    .post(verifyToken, multer.single('image'), createCategory)
    .get(verifyToken, readCategories)
    .put(verifyToken, updateCategory)
    .delete(verifyToken, deleteCategory);

router.route('/category/:id')
    .get(readCategory);

export default router;