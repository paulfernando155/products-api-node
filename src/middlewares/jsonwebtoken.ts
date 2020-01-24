import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauthorize Request');
    }
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    req.body.userId = payload._id
    next();
}