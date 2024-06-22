import { Request, Response, NextFunction } from 'express';
import { decode } from '../modules/jwt/decode';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { isDefined } from '../utils/ts/isDefined';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (isDefined(accessToken)) {
        try {
            const { userId } = decode(accessToken);
            const user = await User.findById(userId);
            if (!isDefined(user)) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            req.userId = userId;
            next();
        } catch (error) {
            console.error(error);
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
    } else {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};
