import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { logout } from '../modules/auth/logout';
import { isString } from '../utils/ts/isString';

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies['refreshToken'];
            if (isString(refreshToken)) await logout(refreshToken);
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(StatusCodes.OK).send();
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }),
);

export default router;
