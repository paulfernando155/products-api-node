import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import Category, { ICategory } from '../models/category';
import Product from '../models/product';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, userId } = req.body;
    const newCategory = { name, description, imagePath: req.file.path };
    const category: ICategory = new Category(newCategory);
    const savedCategory = await category.save();
    return res.json({
        message: 'Product successfully saved',
        savedCategory
    });
};

export const readCategories = async (req: Request, res: Response): Promise<Response> => {
    const categories = await Category.find();
    return res.json({ categories });
};

export async function readCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const category = await Category.findById(id);
    const products = await Product.find({ categoryId: id });
    return res.json({ category, products });
}

export async function updateCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedPhoto = await Category.findByIdAndUpdate(id, {
        name,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}

export async function deleteCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const category = await Category.findByIdAndRemove(id) as ICategory;
    if (category) {
        await fs.unlink(path.resolve(category.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

