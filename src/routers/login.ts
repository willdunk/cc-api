import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'
import { postLoginInputSchema } from '../schemas/login/postLoginInputSchema';
import { postRefreshInputSchema } from '../schemas/login/postRefreshInputSchema';
import { login } from '../modules/auth/login';
import { refresh } from '../modules/auth/refresh';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = postLoginInputSchema.validateSync(req.body);
        const newTokens = await login(email, password);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}));

router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { refreshToken } = postRefreshInputSchema.validateSync(req.body);
        const newTokens = await refresh(refreshToken);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    };
}));

export default router;