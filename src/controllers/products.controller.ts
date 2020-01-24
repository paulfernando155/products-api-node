import { Request, Response } from 'express';

import Product, { IProduct } from '../models/product';

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, price, categoryId, userId } = req.body;
    const newProduct = { name, description, price, imagePath: req.file.path, categoryId };
    const product: IProduct = new Product(newProduct);
    const savedProduct = await product.save();
    return res.json({
        message: 'Product successfully saved',
        savedProduct
    });
};

export const readProducts = async (req: Request, res: Response): Promise<Response> => {
    const products = await Product.find();
    return res.json({ products });
};