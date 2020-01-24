import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';

export const helloWorld = (req: Request, res: Response): Response => {
    return res.send('Hello world');
};