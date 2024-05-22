import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'
import { PostLoginInputSchema } from '../schemas/login/PostLoginInputSchema';
import { PostRefreshInputSchema } from '../schemas/login/PostRefreshInputSchema';
import { login } from '../modules/auth/login';
import { refresh } from '../modules/auth/refresh';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = PostLoginInputSchema.validateSync(req.body);
        const newTokens = await login(email, password);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
});

router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const { refreshToken } = PostRefreshInputSchema.validateSync(req.body);
        const newTokens = await refresh(refreshToken);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    };
});

export default router;