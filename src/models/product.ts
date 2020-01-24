import { Schema, model, Document, Mongoose } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    imagePath: string;
    categoryId: string;
}

export default model<IProduct>('Product', schema);