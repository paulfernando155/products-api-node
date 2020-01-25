import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const newUser = { email, password };
    const user: IUser = new User(newUser);
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    const token: string = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    return res.status(200).header('authorization', token).json({ savedUser });
};

export const signin = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exist");
    const correctPassword: boolean = await user.validatePassword(password);
    if (!correctPassword) return res.status(401).send('Invalid password');
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    return res.status(200).header('authorization', token).json({ user });
};