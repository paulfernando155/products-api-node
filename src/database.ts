import { connect } from 'mongoose';

export const startConnection = async () => {
    await connect('mongodb://localhost/products-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Database is connected');
}