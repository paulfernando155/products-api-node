import { Router } from 'express';

import { signup, signin } from '../controllers/auth.controller';
import { createCategory, readCategories, readCategory, updateCategory, deleteCategory } from '../controllers/categories.controller';
import { createProduct, readProducts, readProduct } from '../controllers/products.controller';

import { verifyToken } from '../middlewares/jsonwebtoken';
import multer from '../middlewares/multer';

const router = Router();

router.post('/signup', signup);

router.get('/signin', signin);

router.route('/products')
    .post(verifyToken, multer.single('image'), createProduct)
    .get(readProducts);

router.route('/products/:id')
    .get(readProduct);

router.route('/categories')
    .post(verifyToken, multer.single('image'), createCategory)
    .get(readCategories)
    .put(verifyToken, updateCategory)
    .delete(verifyToken, deleteCategory);

router.route('/categories/:id')
    .get(readCategory);



export default router;