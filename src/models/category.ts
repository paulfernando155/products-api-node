import { Schema, model, Document } from 'mongoose';
import product, { IProduct } from './product';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
}, { timestamps: true });

export interface ICategory extends Document {
    name: string;
    description: string;
    imagePath: string;
    products: IProduct[];
}

export default model<ICategory>('Category', schema);