import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { postLogoutInputSchema } from '../schemas/logout/postLogoutInputSchema';
import { logout } from '../modules/auth/logout';

const router = express.Router();

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { refreshToken } = postLogoutInputSchema.validateSync(req.body);
        await logout(refreshToken);
        res.status(StatusCodes.OK).send();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}));

export default router;