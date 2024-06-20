import { Request, Response, NextFunction } from 'express';
import { decode } from '../modules/jwt/decode';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { isDefined } from '../utils/ts/isDefined';
import { refresh } from '../modules/auth/refresh';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (isDefined(accessToken) && isDefined(refreshToken)) {
        try {
            const { userId } = decode(accessToken, 'access');
            const user = await User.findById(userId);
            if (!isDefined(user)) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            req.userId = userId;
            next();
        } catch (error) {
            try {
                const newTokens = await refresh(refreshToken); // This already does a user lookup
                const { userId } = decode(newTokens.accessToken, 'access');
                res.cookie('accessToken', newTokens.accessToken);
                res.cookie('refreshToken', newTokens.refreshToken);
                req.userId = userId;
                next();
            } catch (error) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
    } else {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};
