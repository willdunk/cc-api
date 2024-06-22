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
            const accessToken = await login(email, password);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });
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
