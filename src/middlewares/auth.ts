import { Request, Response, NextFunction } from 'express';
import { decode } from '../modules/jwt/decode';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { isDefined } from '../utils/ts/isDefined';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const { userId } = decode(token, "access");
            const user = await User.findById(userId);
            if (!isDefined(user)) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            req.userId = userId;
            next();
        } catch (error) {
            console.log(error);
            res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

    } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};