import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { postLoginInputSchema } from '../schemas/login/postLoginInputSchema';
import { login } from '../modules/auth/login';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        try {
            const { email, password } = postLoginInputSchema.validateSync(req.body);
            const newTokens = await login(email, password);
            res.cookie('accessToken', newTokens.accessToken);
            res.cookie('refreshToken', newTokens.refreshToken);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }),
);

export default router;
